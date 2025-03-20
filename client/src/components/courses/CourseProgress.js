// src/components/courses/CourseProgress.js
import React from 'react';
import { ProgressBar, Card } from 'react-bootstrap';
import { FaCheckCircle, FaPlay } from 'react-icons/fa';

const CourseProgress = ({ progress, isCompleted }) => {
  const getVariant = () => {
    if (isCompleted) return 'success';
    if (progress >= 75) return 'info';
    if (progress >= 50) return 'primary';
    if (progress >= 25) return 'warning';
    return 'danger';
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="mb-0">Course Progress</h5>
          <span className="text-muted">{Math.round(progress)}%</span>
        </div>
        <ProgressBar 
          now={progress} 
          variant={getVariant()} 
          className="mb-3" 
        />
        <div className="d-flex align-items-center">
          {isCompleted ? (
            <>
              <FaCheckCircle className="text-success me-2" />
              <span>Course completed!</span>
            </>
          ) : (
            <>
              <FaPlay className="text-primary me-2" />
              <span>Continue learning</span>
            </>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default CourseProgress;