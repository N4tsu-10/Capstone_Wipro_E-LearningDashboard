// src/components/layout/Sidebar.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';
import { FaTachometerAlt, FaBook, FaGraduationCap, FaUser } from 'react-icons/fa';
import { toggleSidebar } from '../../store/slices/uiSlice';

const Sidebar = () => {
  const dispatch = useDispatch();
  const { showSidebar } = useSelector((state) => state.ui);
  const { darkMode } = useSelector((state) => state.ui);
  
  return (
    <div className={`sidebar ${showSidebar ? 'show' : 'hide'} ${darkMode ? 'bg-dark' : 'bg-light'}`}>
      <div className="d-flex justify-content-between align-items-center p-3">
        <h5 className={`mb-0 ${darkMode ? 'text-white' : ''}`}>Navigation</h5>
        <button 
          className="btn btn-sm" 
          onClick={() => dispatch(toggleSidebar())}
        >
          {showSidebar ? '←' : '→'}
        </button>
      </div>
      <ListGroup variant={darkMode ? 'dark' : 'flush'}>
        <ListGroup.Item 
          as={NavLink} 
          to="/dashboard" 
          className={`border-0 ${darkMode ? 'bg-dark text-white' : ''}`}
        >
          <FaTachometerAlt className="me-2" /> Dashboard
        </ListGroup.Item>
        <ListGroup.Item 
          as={NavLink} 
          to="/courses" 
          className={`border-0 ${darkMode ? 'bg-dark text-white' : ''}`}
        >
          <FaBook className="me-2" /> All Courses
        </ListGroup.Item>
        <ListGroup.Item 
          as={NavLink} 
          to="/my-courses" 
          className={`border-0 ${darkMode ? 'bg-dark text-white' : ''}`}
        >
          <FaGraduationCap className="me-2" /> My Courses
        </ListGroup.Item>
        <ListGroup.Item 
          as={NavLink} 
          to="/profile" 
          className={`border-0 ${darkMode ? 'bg-dark text-white' : ''}`}
        >
          <FaUser className="me-2" /> Profile
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default Sidebar;