// Services/CourseService.cs
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
    public class CourseService : ICourseService
    {
        private readonly ApplicationDbContext _context;

        public CourseService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<CourseDto>> GetAllCoursesAsync()
        {
            return await _context.Courses
                .Select(c => new CourseDto
                {
                    CourseId = c.CourseId,
                    Title = c.Title,
                    Description = c.Description,
                    ImageUrl = c.ImageUrl,
                    Duration = c.Duration,
                    Level = c.Level,
                    QuizCount = c.Quizzes.Count
                })
                .ToListAsync();
        }

        public async Task<CourseDto> GetCourseByIdAsync(int courseId)
        {
            return await _context.Courses
                .Where(c => c.CourseId == courseId)
                .Select(c => new CourseDto
                {
                    CourseId = c.CourseId,
                    Title = c.Title,
                    Description = c.Description,
                    ImageUrl = c.ImageUrl,
                    Duration = c.Duration,
                    Level = c.Level,
                    QuizCount = c.Quizzes.Count
                })
                .FirstOrDefaultAsync();
        }

        public async Task<List<EnrolledCourseDto>> GetUserEnrolledCoursesAsync(int userId)
        {
            return await _context.EnrolledCourses
                .Where(ec => ec.UserId == userId)
                .Select(ec => new EnrolledCourseDto
                {
                    CourseId = ec.CourseId,
                    Title = ec.Course.Title,
                    Description = ec.Course.Description,
                    ImageUrl = ec.Course.ImageUrl,
                    Level = ec.Course.Level,
                    Progress = ec.Progress,
                    IsCompleted = ec.CompletedAt.HasValue
                })
                .ToListAsync();
        }

        public async Task<EnrolledCourseDto> EnrollCourseAsync(int userId, int courseId)
        {
            // Check if already enrolled
            var existingEnrollment = await _context.EnrolledCourses
                .FirstOrDefaultAsync(ec => ec.UserId == userId && ec.CourseId == courseId);

            if (existingEnrollment != null)
            {
                return await GetEnrolledCourseAsync(userId, courseId);
            }

            // Check if course exists
            var course = await _context.Courses.FindAsync(courseId);
            if (course == null)
            {
                return null;
            }

            // Create new enrollment
            var enrollment = new EnrolledCourse
            {
                UserId = userId,
                CourseId = courseId,
                EnrollmentDate = DateTime.UtcNow,
                Progress = 0,
                CompletedAt = null
            };

            await _context.EnrolledCourses.AddAsync(enrollment);
            await _context.SaveChangesAsync();

            return await GetEnrolledCourseAsync(userId, courseId);
        }

        public async Task<bool> IsUserEnrolledAsync(int userId, int courseId)
        {
            return await _context.EnrolledCourses
                .AnyAsync(ec => ec.UserId == userId && ec.CourseId == courseId);
        }

        private async Task<EnrolledCourseDto> GetEnrolledCourseAsync(int userId, int courseId)
        {
            return await _context.EnrolledCourses
                .Where(ec => ec.UserId == userId && ec.CourseId == courseId)
                .Select(ec => new EnrolledCourseDto
                {
                    CourseId = ec.CourseId,
                    Title = ec.Course.Title,
                    Description = ec.Course.Description,
                    ImageUrl = ec.Course.ImageUrl,
                    Level = ec.Course.Level,
                    Progress = ec.Progress,
                    IsCompleted = ec.CompletedAt.HasValue
                })
                .FirstOrDefaultAsync();
        }
    }

    public interface ICourseService
    {
        Task<List<CourseDto>> GetAllCoursesAsync();
        Task<CourseDto> GetCourseByIdAsync(int courseId);
        Task<List<EnrolledCourseDto>> GetUserEnrolledCoursesAsync(int userId);
        Task<EnrolledCourseDto> EnrollCourseAsync(int userId, int courseId);
        Task<bool> IsUserEnrolledAsync(int userId, int courseId);
    }
}