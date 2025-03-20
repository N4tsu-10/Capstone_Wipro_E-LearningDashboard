// Models/Question.cs
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace server.Models
{
    public class Question
    {
        public int QuestionId { get; set; }
        
        public int QuizId { get; set; }
        
        [Required]
        [StringLength(500)]
        public string QuestionText { get; set; }
        
        public int OrderIndex { get; set; }
        
        public DateTime CreatedAt { get; set; }
        
        public DateTime UpdatedAt { get; set; }
        
        // Navigation properties
        public virtual Quiz Quiz { get; set; }
        public virtual ICollection<AnswerOption> AnswerOptions { get; set; }
    }
}