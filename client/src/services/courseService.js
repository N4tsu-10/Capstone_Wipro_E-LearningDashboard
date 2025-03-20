// src/services/courseService.js
import api from './api';

// Get all courses
const getAllCourses = async () => {
  return await api.get('/courses');
};

// Get a specific course
const getCourseById = async (courseId) => {
  return await api.get(`/courses/${courseId}`);
};

// Get enrolled courses
const getEnrolledCourses = async () => {
  return await api.get('/courses/enrolled');
};

// Enroll in a course
const enrollCourse = async (courseId) => {
  return await api.post('/courses/enroll', { courseId });
};

const courseService = {
  getAllCourses,
  getCourseById,
  getEnrolledCourses,
  enrollCourse
};

export default courseService;