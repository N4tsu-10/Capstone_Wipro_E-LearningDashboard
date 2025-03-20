// Models/UserAnswer.cs
namespace server.Models
{
    public class UserAnswer
    {
        public int UserAnswerId { get; set; }
        
        public int AttemptId { get; set; }
        
        public int QuestionId { get; set; }
        
        public int AnswerOptionId { get; set; }
        
        // Navigation properties
        public virtual UserQuizAttempt Attempt { get; set; }
        public virtual Question Question { get; set; }
        public virtual AnswerOption AnswerOption { get; set; }
    }
}