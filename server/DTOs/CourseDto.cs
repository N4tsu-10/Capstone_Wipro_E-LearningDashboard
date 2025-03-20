// DTOs/CourseDto.cs
using System.Collections.Generic;

namespace server.DTOs
{
    public class CourseDto
    {
        public int CourseId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public int? Duration { get; set; }
        public string Level { get; set; }
        public int QuizCount { get; set; }
    }
}