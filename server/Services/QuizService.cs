// Services/QuizService.cs
using server.Data;
using server.DTOs;
using server.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Services
{
    public class QuizService : IQuizService
    {
        private readonly ApplicationDbContext _context;

        public QuizService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<QuizDto>> GetQuizzesByCourseIdAsync(int courseId, int userId)
        {
            // Get all quizzes for the course
            var quizzes = await _context.Quizzes
                .Where(q => q.CourseId == courseId)
                .OrderBy(q => q.OrderIndex)
                .Select(q => new QuizDto
                {
                    QuizId = q.QuizId,
                    Title = q.Title,
                    Description = q.Description,
                    OrderIndex = q.OrderIndex,
                    PassingScore = q.PassingScore,
                    QuestionCount = q.Questions.Count,
                    IsCompleted = q.UserAttempts.Any(a => a.UserId == userId && a.Passed),
                    HighestScore = q.UserAttempts
                        .Where(a => a.UserId == userId)
                        .OrderByDescending(a => a.Score)
                        .Select(a => a.Score)
                        .FirstOrDefault()
                })
                .ToListAsync();

            return quizzes;
        }

        public async Task<QuizDetailDto> GetQuizDetailsAsync(int quizId)
        {
            var quiz = await _context.Quizzes
                .Where(q => q.QuizId == quizId)
                .Select(q => new QuizDetailDto
                {
                    QuizId = q.QuizId,
                    Title = q.Title,
                    Description = q.Description,
                    PassingScore = q.PassingScore,
                    Questions = q.Questions
                        .OrderBy(question => question.OrderIndex)
                        .Select(question => new QuestionDto
                        {
                            QuestionId = question.QuestionId,
                            QuestionText = question.QuestionText,
                            AnswerOptions = question.AnswerOptions
                                .OrderBy(ao => ao.OrderIndex)
                                .Select(ao => new AnswerOptionDto
                                {
                                    AnswerOptionId = ao.AnswerOptionId,
                                    OptionText = ao.OptionText
                                })
                                .ToList()
                        })
                        .ToList()
                })
                .FirstOrDefaultAsync();

            return quiz;
        }

        public async Task<QuizResultDto> SubmitQuizAsync(int userId, QuizSubmissionDto submission)
        {
            // Get the quiz and its questions
            var quiz = await _context.Quizzes
                .Include(q => q.Questions)
                    .ThenInclude(q => q.AnswerOptions)
                .FirstOrDefaultAsync(q => q.QuizId == submission.QuizId);

            if (quiz == null)
                return null;

            // Calculate the score
            int totalQuestions = quiz.Questions.Count;
            int correctAnswers = 0;

            foreach (var answer in submission.Answers)
            {
                var question = quiz.Questions.FirstOrDefault(q => q.QuestionId == answer.QuestionId);
                if (question != null)
                {
                    var selectedOption = question.AnswerOptions.FirstOrDefault(ao => ao.AnswerOptionId == answer.AnswerOptionId);
                    if (selectedOption != null && selectedOption.IsCorrect)
                    {
                        correctAnswers++;
                    }
                }
            }

            int score = totalQuestions > 0 ? (correctAnswers * 100) / totalQuestions : 0;
            bool passed = score >= quiz.PassingScore;

            // Create a new quiz attempt
            var attempt = new UserQuizAttempt
            {
                UserId = userId,
                QuizId = submission.QuizId,
                AttemptDate = DateTime.UtcNow,
                TimeTaken = submission.TimeTaken,
                Score = score,
                Passed = passed,
                UserAnswers = submission.Answers.Select(a => new UserAnswer
                {
                    QuestionId = a.QuestionId,
                    AnswerOptionId = a.AnswerOptionId
                }).ToList()
            };

            await _context.UserQuizAttempts.AddAsync(attempt);
            await _context.SaveChangesAsync();

            // Get the course and update progress
            var course = await _context.Courses.FirstOrDefaultAsync(c => c.Quizzes.Any(q => q.QuizId == submission.QuizId));
            if (course != null)
            {
                // Update course progress
                await UpdateCourseProgress(userId, course.CourseId);
            }

            // Get the updated course progress
            var enrollment = await _context.EnrolledCourses
                .FirstOrDefaultAsync(ec => ec.UserId == userId && ec.CourseId == course.CourseId);

            return new QuizResultDto
            {
                Score = score,
                Passed = passed,
                CourseProgress = enrollment?.Progress ?? 0
            };
        }

        private async Task UpdateCourseProgress(int userId, int courseId)
        {
            // Get total number of quizzes for the course
            var totalQuizzes = await _context.Quizzes
                .Where(q => q.CourseId == courseId)
                .CountAsync();

            if (totalQuizzes == 0)
                return;

            // Get number of completed quizzes
            var completedQuizzes = await _context.Quizzes
                .Where(q => q.CourseId == courseId)
                .CountAsync(q => q.UserAttempts.Any(a => a.UserId == userId && a.Passed));

            // Calculate progress percentage
            float progress = ((float)completedQuizzes / totalQuizzes) * 100;

            // Update enrollment record
            var enrollment = await _context.EnrolledCourses
                .FirstOrDefaultAsync(ec => ec.UserId == userId && ec.CourseId == courseId);

            if (enrollment != null)
            {
                enrollment.Progress = progress;
                enrollment.CompletedAt = progress >= 100 ? DateTime.UtcNow : (DateTime?)null;
                await _context.SaveChangesAsync();
            }
        }
    }

    public interface IQuizService
    {
        Task<List<QuizDto>> GetQuizzesByCourseIdAsync(int courseId, int userId);
        Task<QuizDetailDto> GetQuizDetailsAsync(int quizId);
        Task<QuizResultDto> SubmitQuizAsync(int userId, QuizSubmissionDto submission);
    }
}