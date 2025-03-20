// src/components/layout/Loader.js
import React from 'react';
import { Spinner, Container } from 'react-bootstrap';

const Loader = ({ size = 'md', center = true }) => {
  if (center) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
        <Spinner animation="border" size={size} role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Spinner animation="border" size={size} role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
};

export default Loader;