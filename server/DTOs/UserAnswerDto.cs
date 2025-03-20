// DTOs/UserAnswerDto.cs
using System.ComponentModel.DataAnnotations;

namespace server.DTOs
{
    public class UserAnswerDto
    {
        [Required]
        public int QuestionId { get; set; }
        
        [Required]
        public int AnswerOptionId { get; set; }
    }
}