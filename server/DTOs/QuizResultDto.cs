// DTOs/QuizResultDto.cs
namespace server.DTOs
{
    public class QuizResultDto
    {
        public int Score { get; set; }
        public bool Passed { get; set; }
        public double CourseProgress { get; set; }
    }
}