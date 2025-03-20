// src/pages/MyCoursesPage.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Card, Form, InputGroup, Nav } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { getEnrolledCourses } from '../store/slices/courseSlice';
import CourseList from '../components/courses/CourseList';
import Loader from '../components/layout/Loader';

const MyCoursesPage = () => {
  const dispatch = useDispatch();
  const { enrolledCourses, isLoading } = useSelector((state) => state.courses);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [activeTab, setActiveTab] = React.useState('all');

  useEffect(() => {
    dispatch(getEnrolledCourses());
  }, [dispatch]);

  const filterCourses = () => {
    let filtered = [...enrolledCourses];
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(course => 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by tab
    if (activeTab === 'inProgress') {
      filtered = filtered.filter(course => !course.isCompleted);
    } else if (activeTab === 'completed') {
      filtered = filtered.filter(course => course.isCompleted);
    }
    
    return filtered;
  };

  const filteredCourses = filterCourses();

  return (
    <Container>
      <h2 className="mb-4">My Courses</h2>
      
      <Card className="mb-4">
        <Card.Header>
          <Nav variant="tabs" activeKey={activeTab} onSelect={setActiveTab}>
            <Nav.Item>
              <Nav.Link eventKey="all">All Courses</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="inProgress">In Progress</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="completed">Completed</Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body>
          <InputGroup className="mb-3">
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search my courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Card.Body>
      </Card>
      
      <CourseList 
        courses={filteredCourses} 
        isLoading={isLoading} 
        isEnrolledView={true}
      />
    </Container>
  );
};

export default MyCoursesPage;