// src/components/courses/EnrollmentStats.js
import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { 
  FaBook, 
  FaGraduationCap, 
  FaChartLine, 
  FaCertificate 
} from 'react-icons/fa';

const EnrollmentStats = ({ enrolledCourses }) => {
  const totalCourses = enrolledCourses.length;
  const completedCourses = enrolledCourses.filter(course => course.isCompleted).length;
  
  const averageProgress = totalCourses ? 
    enrolledCourses.reduce((acc, course) => acc + course.progress, 0) / totalCourses : 
    0;
  
  return (
    <Card className="mb-4">
      <Card.Header>
        <h5 className="mb-0">Your Learning Stats</h5>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col md={3} sm={6} className="mb-3 mb-md-0">
            <div className="d-flex align-items-center">
              <div className="bg-primary bg-opacity-10 p-3 rounded me-3">
                <FaBook className="text-primary" />
              </div>
              <div>
                <h6 className="mb-0">Enrolled</h6>
                <h4 className="mb-0">{totalCourses}</h4>
              </div>
            </div>
          </Col>
          
          <Col md={3} sm={6} className="mb-3 mb-md-0">
            <div className="d-flex align-items-center">
              <div className="bg-success bg-opacity-10 p-3 rounded me-3">
                <FaGraduationCap className="text-success" />
              </div>
              <div>
                <h6 className="mb-0">Completed</h6>
                <h4 className="mb-0">{completedCourses}</h4>
              </div>
            </div>
          </Col>
          
          <Col md={3} sm={6} className="mb-3 mb-md-0">
            <div className="d-flex align-items-center">
              <div className="bg-info bg-opacity-10 p-3 rounded me-3">
                <FaChartLine className="text-info" />
              </div>
              <div>
                <h6 className="mb-0">Avg. Progress</h6>
                <h4 className="mb-0">{Math.round(averageProgress)}%</h4>
              </div>
            </div>
          </Col>
          
          <Col md={3} sm={6}>
            <div className="d-flex align-items-center">
              <div className="bg-warning bg-opacity-10 p-3 rounded me-3">
                <FaCertificate className="text-warning" />
              </div>
              <div>
                <h6 className="mb-0">Completion Rate</h6>
                <h4 className="mb-0">
                  {totalCourses ? Math.round((completedCourses / totalCourses) * 100) : 0}%
                </h4>
              </div>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default EnrollmentStats; 