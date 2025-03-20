// src/services/authService.js
import api from './api';

// Register user
const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  if (response) {
    localStorage.setItem('user', JSON.stringify(response));
  }
  return response;
};

// Login user
const login = async (userData) => {
  const response = await api.post('/auth/login', userData);
  if (response) {
    localStorage.setItem('user', JSON.stringify(response));
  }
  return response;
};

// Logout user
const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  register,
  login,
  logout
};

export default authService;