// src/pages/CourseDetailPage.js
import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Card, Button, Breadcrumb } from 'react-bootstrap';
import { FaArrowLeft, FaList, FaPlay } from 'react-icons/fa';
import { setCurrentCourse, enrollCourse } from '../store/slices/courseSlice';
import { getQuizzesByCourse } from '../store/slices/quizSlice';
import CourseProgress from '../components/courses/CourseProgress';
import QuizList from '../components/quizzes/QuizList';
import Loader from '../components/layout/Loader';

const CourseDetailPage = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { courses, enrolledCourses, isLoading: isCoursesLoading } = useSelector((state) => state.courses);
  const { quizzes, isLoading: isQuizzesLoading } = useSelector((state) => state.quizzes);
  
  // Find the course either in all courses or enrolled courses
  const course = React.useMemo(() => {
    const enrolledCourse = enrolledCourses.find(c => c.courseId === parseInt(courseId));
    if (enrolledCourse) return enrolledCourse;
    
    return courses.find(c => c.courseId === parseInt(courseId));
  }, [courseId, courses, enrolledCourses]);
  
  const isEnrolled = enrolledCourses.some(c => c.courseId === parseInt(courseId));
  
  useEffect(() => {
    if (parseInt(courseId)) {
      // Set current course for global state access
      dispatch(setCurrentCourse(course));
      
      // If enrolled, fetch quizzes
      if (isEnrolled) {
        dispatch(getQuizzesByCourse(parseInt(courseId)));
      }
    }
  }, [dispatch, courseId, course, isEnrolled]);
  
  const handleEnroll = () => {
    dispatch(enrollCourse(parseInt(courseId)));
  };
  
  if (isCoursesLoading || !course) {
    return <Loader />;
  }

  return (
    <Container>
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/courses" }}>Courses</Breadcrumb.Item>
        <Breadcrumb.Item active>{course.title}</Breadcrumb.Item>
      </Breadcrumb>
      
      <Card className="mb-4">
        <Row className="g-0">
          <Col md={4}>
            <img 
              src={course.imageUrl || 'https://via.placeholder.com/300x200?text=Course+Image'} 
              alt={course.title} 
              className="img-fluid rounded-start" 
              style={{ height: '100%', objectFit: 'cover' }}
            />
          </Col>
          <Col md={8}>
            <Card.Body>
              <div className="d-flex justify-content-between mb-3">
                <h2>{course.title}</h2>
                <Button 
                  variant="outline-primary" 
                  as={Link} 
                  to="/courses"
                  className="d-flex align-items-center"
                >
                  <FaArrowLeft className="me-2" /> Back
                </Button>
              </div>
              
              <Card.Text>{course.description}</Card.Text>
              
              <div className="d-flex mb-3">
                <div className="me-4">
                  <strong>Level:</strong> {course.level}
                </div>
                {course.duration && (
                  <div>
                    <strong>Duration:</strong> {Math.floor(course.duration / 60)}h {course.duration % 60}m
                  </div>
                )}
              </div>
              
              {isEnrolled ? (
                <Button
                  variant="primary"
                  onClick={() => navigate(`/courses/${courseId}/quizzes/${quizzes[0]?.quizId}`)}
                  disabled={quizzes.length === 0 || isQuizzesLoading}
                >
                  <FaPlay className="me-2" />
                  {quizzes.length > 0 ? 'Start Learning' : 'No Quizzes Available'}
                </Button>
              ) : (
                <Button
                  variant="success"
                  onClick={handleEnroll}
                  disabled={isCoursesLoading}
                >
                  Enroll Now
                </Button>
              )}
            </Card.Body>
          </Col>
        </Row>
      </Card>
      
      {isEnrolled && (
        <>
          <CourseProgress 
            progress={course.progress || 0} 
            isCompleted={course.isCompleted} 
          />
          
          <Card>
            <Card.Header className="bg-light">
              <h4 className="mb-0 d-flex align-items-center">
                <FaList className="me-2" /> Course Quizzes
              </h4>
            </Card.Header>
            <Card.Body>
              {isQuizzesLoading ? (
                <Loader />
              ) : (
                <QuizList quizzes={quizzes} courseId={parseInt(courseId)} />
              )}
            </Card.Body>
          </Card>
        </>
      )}
    </Container>
  );
};

export default CourseDetailPage;