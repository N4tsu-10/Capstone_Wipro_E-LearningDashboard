// Models/EnrolledCourse.cs
using System;
using System.ComponentModel.DataAnnotations;

namespace server.Models
{
    public class EnrolledCourse
    {
        public int EnrollmentId { get; set; }
        
        public int UserId { get; set; }
        
        public int CourseId { get; set; }
        
        public DateTime EnrollmentDate { get; set; }
        
        public double Progress { get; set; }
        
        public DateTime? CompletedAt { get; set; }
        
        // Navigation properties
        public virtual User User { get; set; }
        public virtual Course Course { get; set; }
    }
}
