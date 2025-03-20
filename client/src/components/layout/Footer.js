// src/components/layout/Footer.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const Footer = () => {
  const { darkMode } = useSelector((state) => state.ui);
  
  return (
    <footer className={`mt-auto py-3 ${darkMode ? 'bg-dark text-light' : 'bg-light'}`}>
      <Container>
        <Row>
          <Col className="text-center">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} E-Learning Platform. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;