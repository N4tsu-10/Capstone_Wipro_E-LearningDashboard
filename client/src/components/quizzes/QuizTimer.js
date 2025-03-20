// src/components/quizzes/QuizTimer.js
import React, { useState, useEffect } from 'react';
import { Card, ProgressBar } from 'react-bootstrap';
import { FaClock } from 'react-icons/fa';

const QuizTimer = ({ onTimerEnd, duration = 600 }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  
  useEffect(() => {
    if (timeLeft <= 0) {
      onTimerEnd(duration - timeLeft);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, onTimerEnd, duration]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const getProgressVariant = () => {
    const percentageLeft = (timeLeft / duration) * 100;
    if (percentageLeft > 50) return 'info';
    if (percentageLeft > 25) return 'warning';
    return 'danger';
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div className="d-flex align-items-center">
            <FaClock className="me-2 text-primary" />
            <h5 className="mb-0">Time Remaining</h5>
          </div>
          <h5 className="mb-0">{formatTime(timeLeft)}</h5>
        </div>
        <ProgressBar 
          now={(timeLeft / duration) * 100} 
          variant={getProgressVariant()} 
        />
      </Card.Body>
    </Card>
  );
};

export default QuizTimer;