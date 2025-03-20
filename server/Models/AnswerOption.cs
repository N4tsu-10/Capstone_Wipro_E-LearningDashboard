// Models/AnswerOption.cs
using System.ComponentModel.DataAnnotations;

namespace server.Models
{
    public class AnswerOption
    {
        public int AnswerOptionId { get; set; }
        
        public int QuestionId { get; set; }
        
        [Required]
        [StringLength(255)]
        public string OptionText { get; set; }
        
        public bool IsCorrect { get; set; }
        
        public int OrderIndex { get; set; }
        
        // Navigation properties
        public virtual Question Question { get; set; }
    }
}