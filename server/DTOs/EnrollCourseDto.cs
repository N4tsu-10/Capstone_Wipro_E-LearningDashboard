// DTOs/EnrollCourseDto.cs
using System.ComponentModel.DataAnnotations;

namespace server.DTOs
{
    public class EnrollCourseDto
    {
        [Required]
        public int CourseId { get; set; }
    }
}