// src/pages/RegisterPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import RegisterForm from '../components/auth/RegisterForm';

const RegisterPage = () => {
  return (
    <Container>
      <Row className="justify-content-center align-items-center min-vh-75">
        <Col md={6}>
          <RegisterForm />
          <Card.Footer className="text-center py-3 mt-3">
            Already have an account? <Link to="/login">Login</Link>
          </Card.Footer>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;