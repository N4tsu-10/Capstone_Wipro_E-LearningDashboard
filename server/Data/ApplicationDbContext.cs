// Data/ApplicationDbContext.cs
using server.Models;
using Microsoft.EntityFrameworkCore;

namespace server.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<EnrolledCourse> EnrolledCourses { get; set; }
        public DbSet<Quiz> Quizzes { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<AnswerOption> AnswerOptions { get; set; }
        public DbSet<UserQuizAttempt> UserQuizAttempts { get; set; }
        public DbSet<UserAnswer> UserAnswers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure entity relationships

            // User
            modelBuilder.Entity<User>()
                .HasKey(u => u.UserId);

            modelBuilder.Entity<User>()
                .HasIndex(u => u.Username)
                .IsUnique();

            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            // Course
            modelBuilder.Entity<Course>()
                .HasKey(c => c.CourseId);

            // EnrolledCourse
            modelBuilder.Entity<EnrolledCourse>()
                .HasKey(ec => ec.EnrollmentId);

            modelBuilder.Entity<EnrolledCourse>()
                .HasIndex(ec => new { ec.UserId, ec.CourseId })
                .IsUnique();

            modelBuilder.Entity<EnrolledCourse>()
                .HasOne(ec => ec.User)
                .WithMany(u => u.EnrolledCourses)
                .HasForeignKey(ec => ec.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<EnrolledCourse>()
                .HasOne(ec => ec.Course)
                .WithMany(c => c.EnrolledCourses)
                .HasForeignKey(ec => ec.CourseId)
                .OnDelete(DeleteBehavior.Cascade);

            // Quiz
            modelBuilder.Entity<Quiz>()
                .HasKey(q => q.QuizId);

            modelBuilder.Entity<Quiz>()
                .HasOne(q => q.Course)
                .WithMany(c => c.Quizzes)
                .HasForeignKey(q => q.CourseId)
                .OnDelete(DeleteBehavior.Cascade);

            // Question
            modelBuilder.Entity<Question>()
                .HasKey(q => q.QuestionId);

            modelBuilder.Entity<Question>()
                .HasOne(q => q.Quiz)
                .WithMany(qz => qz.Questions)
                .HasForeignKey(q => q.QuizId)
                .OnDelete(DeleteBehavior.Cascade);

            // AnswerOption
            modelBuilder.Entity<AnswerOption>()
                .HasKey(ao => ao.AnswerOptionId);

            modelBuilder.Entity<AnswerOption>()
                .HasOne(ao => ao.Question)
                .WithMany(q => q.AnswerOptions)
                .HasForeignKey(ao => ao.QuestionId)
                .OnDelete(DeleteBehavior.Cascade);

            // UserQuizAttempt
            modelBuilder.Entity<UserQuizAttempt>()
                .HasKey(uqa => uqa.AttemptId);

            modelBuilder.Entity<UserQuizAttempt>()
                .HasOne(uqa => uqa.User)
                .WithMany(u => u.QuizAttempts)
                .HasForeignKey(uqa => uqa.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<UserQuizAttempt>()
                .HasOne(uqa => uqa.Quiz)
                .WithMany(q => q.UserAttempts)
                .HasForeignKey(uqa => uqa.QuizId)
                .OnDelete(DeleteBehavior.Cascade);

            // UserAnswer
            modelBuilder.Entity<UserAnswer>()
                .HasKey(ua => ua.UserAnswerId);

            modelBuilder.Entity<UserAnswer>()
                .HasOne(ua => ua.Attempt)
                .WithMany(uqa => uqa.UserAnswers)
                .HasForeignKey(ua => ua.AttemptId)
                .OnDelete(DeleteBehavior.Cascade);

            // Define cascade delete behavior carefully to avoid cycles
            modelBuilder.Entity<UserAnswer>()
                .HasOne(ua => ua.Question)
                .WithMany()
                .HasForeignKey(ua => ua.QuestionId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<UserAnswer>()
                .HasOne(ua => ua.AnswerOption)
                .WithMany()
                .HasForeignKey(ua => ua.AnswerOptionId)
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}