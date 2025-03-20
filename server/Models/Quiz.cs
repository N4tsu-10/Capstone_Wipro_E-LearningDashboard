// Models/Quiz.cs
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace server.Models
{
    public class Quiz
    {
        public int QuizId { get; set; }
        
        public int CourseId { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Title { get; set; }
        
        [StringLength(500)]
        public string Description { get; set; }
        
        public int OrderIndex { get; set; }
        
        public int PassingScore { get; set; } = 70;
        
        public DateTime CreatedAt { get; set; }
        
        public DateTime UpdatedAt { get; set; }
        
        // Navigation properties
        public virtual Course Course { get; set; }
        public virtual ICollection<Question> Questions { get; set; }
        public virtual ICollection<UserQuizAttempt> UserAttempts { get; set; }
    }
}