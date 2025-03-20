// DTOs/EnrolledCourseDto.cs
namespace server.DTOs
{
    public class EnrolledCourseDto
    {
        public int CourseId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public string Level { get; set; }
        public double Progress { get; set; }
        public bool IsCompleted { get; set; }
    }
}