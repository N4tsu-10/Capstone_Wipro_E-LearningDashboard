// Models/Course.cs
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace server.Models
{
    public class Course
    {
        public int CourseId { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Title { get; set; }
        
        [StringLength(500)]
        public string Description { get; set; }
        
        [StringLength(255)]
        public string ImageUrl { get; set; }
        
        public int? Duration { get; set; }
        
        [StringLength(50)]
        public string Level { get; set; }
        
        public DateTime CreatedAt { get; set; }
        
        public DateTime UpdatedAt { get; set; }
        
        // Navigation properties
        public virtual ICollection<Quiz> Quizzes { get; set; }
        public virtual ICollection<EnrolledCourse> EnrolledCourses { get; set; }
    }
}