// src/components/layout/MainLayout.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import AlertMessage from './AlertMessage';

const MainLayout = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { showSidebar, darkMode } = useSelector((state) => state.ui);

  return (
    <div className={`d-flex flex-column min-vh-100 ${darkMode ? 'bg-dark text-light' : ''}`}>
      <Header />
      <AlertMessage />
      
      <Container fluid className="flex-grow-1">
        <Row>
          {isAuthenticated && (
            <Col md={showSidebar ? 2 : 1} className="px-0">
              <Sidebar />
            </Col>
          )}
          <Col md={isAuthenticated ? (showSidebar ? 10 : 11) : 12}>
            <Container className="py-3">
              {children}
            </Container>
          </Col>
        </Row>
      </Container>
      
      <Footer />
    </div>
  );
};

export default MainLayout;