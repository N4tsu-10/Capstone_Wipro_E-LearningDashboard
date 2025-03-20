// src/services/quizService.js
import api from './api';

// Get quizzes by course
const getQuizzesByCourse = async (courseId) => {
  return await api.get(`/quizzes/course/${courseId}`);
};

// Get quiz details
const getQuizDetails = async (quizId) => {
  return await api.get(`/quizzes/${quizId}`);
};

// Submit quiz
const submitQuiz = async (submissionData) => {
  return await api.post('/quizzes/submit', submissionData);
};

const quizService = {
  getQuizzesByCourse,
  getQuizDetails,
  submitQuiz
};

export default quizService;