// DTOs/QuizDto.cs
namespace server.DTOs
{
    public class QuizDto
    {
        public int QuizId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int OrderIndex { get; set; }
        public int PassingScore { get; set; }
        public int QuestionCount { get; set; }
        public bool IsCompleted { get; set; }
        public int? HighestScore { get; set; }
    }
}