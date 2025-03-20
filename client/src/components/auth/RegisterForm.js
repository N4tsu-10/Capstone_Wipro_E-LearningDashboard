// src/components/auth/RegisterForm.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Card, Button, Alert } from 'react-bootstrap';
import { register, reset } from '../../store/slices/authSlice';
import Loader from '../layout/Loader';

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isAuthenticated, error } = useSelector((state) => state.auth);

  useEffect(() => {
    // If already authenticated, redirect to dashboard
    if (isAuthenticated) {
      navigate('/auth/login');
    }

    // Reset auth state on component unmount
    return () => {
      dispatch(reset());
    };
  }, [isAuthenticated, navigate, dispatch]);

  // Form validation schema
  const validationSchema = Yup.object({
    username: Yup.string()
      .min(4, 'Username must be at least 4 characters')
      .max(50, 'Username must be at most 50 characters')
      .required('Username is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    firstName: Yup.string().max(50, 'First name must be at most 50 characters'),
    lastName: Yup.string().max(50, 'Last name must be at most 50 characters')
  });

  const handleSubmit = (values) => {
    dispatch(register(values));
  };

  return (
    <Card className="shadow">
      <Card.Header className="bg-primary text-white">
        <h4 className="mb-0">Register</h4>
      </Card.Header>
      <Card.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        
        <Formik
          initialValues={{ 
            username: '', 
            email: '', 
            password: '', 
            firstName: '', 
            lastName: '' 
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <Field
                  type="text"
                  id="username"
                  name="username"
                  className="form-control"
                  placeholder="Choose a username"
                />
                <ErrorMessage name="username" component="div" className="text-danger" />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter your email"
                />
                <ErrorMessage name="email" component="div" className="text-danger" />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  placeholder="Create a password"
                />
                <ErrorMessage name="password" component="div" className="text-danger" />
              </div>

              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">First Name</label>
                <Field
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="form-control"
                  placeholder="Enter your first name"
                />
                <ErrorMessage name="firstName" component="div" className="text-danger" />
              </div>

              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <Field
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="form-control"
                  placeholder="Enter your last name"
                />
                <ErrorMessage name="lastName" component="div" className="text-danger" />
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-100"
                disabled={isLoading || isSubmitting}
              >
                {isLoading ? <Loader size="sm" center={false} /> : 'Register'}
              </Button>
            </Form>
          )}
        </Formik>
      </Card.Body>
    </Card>
  );
};

export default RegisterForm;