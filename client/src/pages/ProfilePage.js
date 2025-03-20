// src/pages/ProfilePage.js
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Card, Row, Col, Form, Button } from 'react-bootstrap';
import { FaUser, FaEnvelope } from 'react-icons/fa';

const ProfilePage = () => {
  const { user } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  
  // This would be enhanced with proper form handling in a real app
  const [formData, setFormData] = useState({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    email: user.email || ''
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, dispatch an action to update the profile
    // For now, just exit edit mode
    setIsEditing(false);
  };
  
  return (
    <Container>
      <h2 className="mb-4">Profile</h2>
      
      <Card>
        <Card.Body>
          <Row>
            <Col md={4} className="text-center mb-4 mb-md-0">
              <div className="rounded-circle bg-primary bg-opacity-10 p-4 d-inline-flex mb-3">
                <FaUser size={84} className="text-primary" />
              </div>
              <h3>{user.username}</h3>
              <p className="text-muted">
                <FaEnvelope className="me-2" />
                {user.email}
              </p>
            </Col>
            <Col md={8}>
              {isEditing ? (
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled
                    />
                    <Form.Text className="text-muted">
                      Email cannot be changed
                    </Form.Text>
                  </Form.Group>
                  
                  <div className="d-flex gap-2">
                    <Button type="submit" variant="primary">
                      Save Changes
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline-secondary"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </Form>
              ) : (
                <>
                  <h4>User Information</h4>
                  <hr />
                  
                  <Row className="mb-3">
                    <Col md={6}>
                      <p className="mb-1 text-muted">Username</p>
                      <h5>{user.username}</h5>
                    </Col>
                    <Col md={6}>
                      <p className="mb-1 text-muted">Email</p>
                      <h5>{user.email}</h5>
                    </Col>
                  </Row>
                  
                  <Row className="mb-4">
                    <Col md={6}>
                      <p className="mb-1 text-muted">First Name</p>
                      <h5>{user.firstName || '—'}</h5>
                    </Col>
                    <Col md={6}>
                      <p className="mb-1 text-muted">Last Name</p>
                      <h5>{user.lastName || '—'}</h5>
                    </Col>
                  </Row>
                  
                  <Button 
                    variant="primary" 
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </Button>
                </>
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProfilePage;