// src/components/courses/CourseList.js
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import CourseCard from './CourseCard';
import Loader from '../layout/Loader';

const CourseList = ({ courses, isLoading, isEnrolledView = false }) => {
  if (isLoading) {
    return <Loader />;
  }

  if (!courses.length) {
    return (
      <div className="text-center py-5">
        <h4 className="text-muted">
          {isEnrolledView ? 
            "You haven't enrolled in any courses yet." : 
            "No courses available at the moment."
          }
        </h4>
      </div>
    );
  }

  return (
    <Row xs={1} md={2} lg={3} className="g-4">
      {courses.map(course => (
        <Col key={course.courseId}>
          <CourseCard 
            course={course} 
            isEnrolled={isEnrolledView} 
          />
        </Col>
      ))}
    </Row>
  );
};

export default CourseList;

