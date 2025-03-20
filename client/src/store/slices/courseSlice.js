// src/store/slices/courseSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import courseService from '../../services/courseService';

// Get all courses
export const getAllCourses = createAsyncThunk(
  'courses/getAll',
  async (_, thunkAPI) => {
    try {
      return await courseService.getAllCourses();
    } catch (error) {
      const message = error.response?.data || error.message || 'An error occurred';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get enrolled courses
export const getEnrolledCourses = createAsyncThunk(
  'courses/getEnrolled',
  async (_, thunkAPI) => {
    try {
      return await courseService.getEnrolledCourses();
    } catch (error) {
      const message = error.response?.data || error.message || 'An error occurred';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Enroll in a course
export const enrollCourse = createAsyncThunk(
  'courses/enroll',
  async (courseId, thunkAPI) => {
    try {
      return await courseService.enrollCourse(courseId);
    } catch (error) {
      const message = error.response?.data || error.message || 'An error occurred';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  courses: [],
  enrolledCourses: [],
  currentCourse: null,
  isLoading: false,
  error: null
};

const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.error = null;
    },
    setCurrentCourse: (state, action) => {
      state.currentCourse = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Get all courses cases
      .addCase(getAllCourses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.courses = action.payload;
      })
      .addCase(getAllCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Get enrolled courses cases
      .addCase(getEnrolledCourses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEnrolledCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.enrolledCourses = action.payload;
      })
      .addCase(getEnrolledCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Enroll course cases
      .addCase(enrollCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(enrollCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.enrolledCourses = [...state.enrolledCourses, action.payload];
      })
      .addCase(enrollCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { reset, setCurrentCourse } = courseSlice.actions;
export default courseSlice.reducer;
