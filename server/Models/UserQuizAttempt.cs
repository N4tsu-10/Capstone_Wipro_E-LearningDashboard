// Models/UserQuizAttempt.cs
using System;
using System.Collections.Generic;

namespace server.Models
{
    public class UserQuizAttempt
    {
        public int AttemptId { get; set; }
        
        public int UserId { get; set; }
        
        public int QuizId { get; set; }
        
        public DateTime AttemptDate { get; set; }
        
        public int Score { get; set; }
        
        public int? TimeTaken { get; set; }
        
        public bool Passed { get; set; }
        
        // Navigation properties
        public virtual User User { get; set; }
        public virtual Quiz Quiz { get; set; }
        public virtual ICollection<UserAnswer> UserAnswers { get; set; }
    }
}