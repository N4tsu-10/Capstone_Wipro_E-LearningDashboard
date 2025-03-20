// src/pages/CoursesPage.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Card, Form, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { getAllCourses } from '../store/slices/courseSlice';
import CourseList from '../components/courses/CourseList';
import Loader from '../components/layout/Loader';

const CoursesPage = () => {
  const dispatch = useDispatch();
  const { courses, isLoading } = useSelector((state) => state.courses);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterLevel, setFilterLevel] = React.useState('');

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        course.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = filterLevel ? course.level === filterLevel : true;
    return matchesSearch && matchesLevel;
  });

  return (
    <Container>
      <h2 className="mb-4">Course Catalog</h2>
      
      <Card className="mb-4">
        <Card.Body>
          <Row>
            <Col md={8}>
              <InputGroup className="mb-3 mb-md-0">
                <InputGroup.Text>
                  <FaSearch />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={4}>
              <Form.Select
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value)}
              >
                <option value="">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </Form.Select>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      
      <CourseList 
        courses={filteredCourses} 
        isLoading={isLoading} 
      />
    </Container>
  );
};

export default CoursesPage;