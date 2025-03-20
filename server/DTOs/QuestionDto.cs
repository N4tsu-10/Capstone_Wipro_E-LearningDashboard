// DTOs/QuestionDto.cs
using System.Collections.Generic;

namespace server.DTOs
{
    public class QuestionDto
    {
        public int QuestionId { get; set; }
        public string QuestionText { get; set; }
        public List<AnswerOptionDto> AnswerOptions { get; set; }
    }
}
