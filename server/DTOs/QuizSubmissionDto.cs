// DTOs/QuizSubmissionDto.cs
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace server.DTOs
{
    public class QuizSubmissionDto
    {
        [Required]
        public int QuizId { get; set; }
        
        [Required]
        public List<UserAnswerDto> Answers { get; set; }
        
        public int? TimeTaken { get; set; }
    }
}