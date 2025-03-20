// src/pages/LoginPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import LoginForm from '../components/auth/LoginForm';

const LoginPage = () => {
  return (
    <Container>
      <Row className="justify-content-center align-items-center min-vh-75">
        <Col md={6}>
          <LoginForm />
          <Card.Footer className="text-center py-3 mt-3">
            Don't have an account? <Link to="/register">Register</Link>
          </Card.Footer>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
