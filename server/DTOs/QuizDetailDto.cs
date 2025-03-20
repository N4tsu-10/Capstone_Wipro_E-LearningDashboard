// DTOs/QuizDetailDto.cs
using System.Collections.Generic;

namespace server.DTOs
{
    public class QuizDetailDto
    {
        public int QuizId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int PassingScore { get; set; }
        public List<QuestionDto> Questions { get; set; }
    }
}