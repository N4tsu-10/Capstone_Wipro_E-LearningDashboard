// src/store/slices/quizSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import quizService from '../../services/quizService';

// Get quizzes by course
export const getQuizzesByCourse = createAsyncThunk(
  'quizzes/getByCourse',
  async (courseId, thunkAPI) => {
    try {
      return await quizService.getQuizzesByCourse(courseId);
    } catch (error) {
      const message = error.response?.data || error.message || 'An error occurred';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get quiz details
export const getQuizDetails = createAsyncThunk(
  'quizzes/getDetails',
  async (quizId, thunkAPI) => {
    try {
      return await quizService.getQuizDetails(quizId);
    } catch (error) {
      const message = error.response?.data || error.message || 'An error occurred';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Submit quiz
export const submitQuiz = createAsyncThunk(
  'quizzes/submit',
  async (submissionData, thunkAPI) => {
    try {
      return await quizService.submitQuiz(submissionData);
    } catch (error) {
      const message = error.response?.data || error.message || 'An error occurred';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  quizzes: [],
  currentQuiz: null,
  quizResult: null,
  isLoading: false,
  error: null
};

const quizSlice = createSlice({
  name: 'quizzes',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.error = null;
      state.quizResult = null;
    },
    setCurrentQuiz: (state, action) => {
      state.currentQuiz = action.payload;
    },
    clearQuizResult: (state) => {
      state.quizResult = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Get quizzes by course cases
      .addCase(getQuizzesByCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getQuizzesByCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.quizzes = action.payload;
      })
      .addCase(getQuizzesByCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Get quiz details cases
      .addCase(getQuizDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getQuizDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentQuiz = action.payload;
      })
      .addCase(getQuizDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Submit quiz cases
      .addCase(submitQuiz.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(submitQuiz.fulfilled, (state, action) => {
        state.isLoading = false;
        state.quizResult = action.payload;
      })
      .addCase(submitQuiz.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { reset, setCurrentQuiz, clearQuizResult } = quizSlice.actions;
export default quizSlice.reducer;
