// src/components/courses/CourseCard.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Badge } from 'react-bootstrap';
import { FaClock, FaChartLine } from 'react-icons/fa';
import { enrollCourse } from '../../store/slices/courseSlice';

const CourseCard = ({ course, isEnrolled }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEnroll = () => {
    dispatch(enrollCourse(course.courseId));
  };

  const handleViewCourse = () => {
    navigate(`/courses/${course.courseId}`);
  };

  return (
    <Card className="h-100 shadow-sm">
      <Card.Img 
        variant="top" 
        src={course.imageUrl || 'https://via.placeholder.com/300x150?text=Course+Image'} 
        alt={course.title}
        style={{ height: '150px', objectFit: 'cover' }}
      />
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between mb-2">
          <Badge bg={
            course.level === 'Beginner' ? 'success' : 
            course.level === 'Intermediate' ? 'warning' : 
            'danger'
          }>
            {course.level}
          </Badge>
          <small className="text-muted">
            <FaClock className="me-1" />
            {course.duration ? `${Math.floor(course.duration / 60)}h ${course.duration % 60}m` : 'Self-paced'}
          </small>
        </div>
        
        <Card.Title>{course.title}</Card.Title>
        <Card.Text className="text-muted flex-grow-1">
          {course.description ? 
            (course.description.length > 120 ? 
              `${course.description.substring(0, 120)}...` : 
              course.description
            ) : 
            'No description available'
          }
        </Card.Text>
        
        <div className="mt-2">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <small className="text-muted">{course.quizCount} quizzes</small>
            {isEnrolled && course.progress !== undefined && (
              <small className="text-muted">
                <FaChartLine className="me-1" />
                Progress: {Math.round(course.progress)}%
              </small>
            )}
          </div>
          
          {isEnrolled ? (
            <Button 
              variant="outline-primary" 
              className="w-100"
              onClick={handleViewCourse}
            >
              View Course
            </Button>
          ) : (
            <Button 
              variant="primary" 
              className="w-100"
              onClick={handleEnroll}
            >
              Enroll Now
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default CourseCard;



