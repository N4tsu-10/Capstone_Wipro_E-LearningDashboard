// src/pages/DashboardPage.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getEnrolledCourses } from '../store/slices/courseSlice';
import EnrollmentStats from '../components/courses/EnrollmentStats';
import CourseCard from '../components/courses/CourseCard';
import Loader from '../components/layout/Loader';
import { FaBook, FaArrowRight } from 'react-icons/fa';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { enrolledCourses, isLoading } = useSelector((state) => state.courses);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getEnrolledCourses());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  // Get the most recent courses (up to 3)
  const recentCourses = [...enrolledCourses]
    .sort((a, b) => new Date(b.enrollmentDate) - new Date(a.enrollmentDate))
    .slice(0, 3);

  return (
    <Container>
      <div className="mb-4">
        <h2>Welcome back, {user.firstName || user.username}!</h2>
        <p className="text-muted">Track your progress and continue learning</p>
      </div>

      {/* Stats */}
      {enrolledCourses.length > 0 && (
        <EnrollmentStats enrolledCourses={enrolledCourses} />
      )}

      {/* Recent Courses */}
      <Card className="mb-4">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Recent Courses</h5>
          <Button 
            as={Link} 
            to="/my-courses" 
            variant="outline-primary" 
            size="sm"
          >
            View All Courses <FaArrowRight className="ms-1" />
          </Button>
        </Card.Header>
        <Card.Body>
          {enrolledCourses.length === 0 ? (
            <div className="text-center py-5">
              <FaBook size={48} className="text-muted mb-3" />
              <h5>You haven't enrolled in any courses yet</h5>
              <p className="text-muted">Explore our course catalog to get started</p>
              <Button as={Link} to="/courses" variant="primary">
                Browse Courses
              </Button>
            </div>
          ) : (
            <Row xs={1} md={3} className="g-4">
              {recentCourses.map(course => (
                <Col key={course.courseId}>
                  <CourseCard course={course} isEnrolled={true} />
                </Col>
              ))}
            </Row>
          )}
        </Card.Body>
      </Card>

      {/* Quick Links */}
      <Card>
        <Card.Header>
          <h5 className="mb-0">Quick Links</h5>
        </Card.Header>
        <Card.Body>
          <Row className="text-center g-3">
            <Col md={3} sm={6}>
              <Link to="/courses" className="text-decoration-none">
                <Card className="h-100 py-3">
                  <Card.Body>
                    <FaBook size={24} className="mb-2 text-primary" />
                    <h6>Browse Courses</h6>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
            <Col md={3} sm={6}>
              <Link to="/my-courses" className="text-decoration-none">
                <Card className="h-100 py-3">
                  <Card.Body>
                    <FaBook size={24} className="mb-2 text-success" />
                    <h6>My Courses</h6>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
            {/* Add more quick links as needed */}
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default DashboardPage;