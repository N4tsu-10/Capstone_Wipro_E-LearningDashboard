// src/components/quizzes/QuizList.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ListGroup, Badge, Button } from 'react-bootstrap';
import { 
  FaCheckCircle, 
  FaTimesCircle, 
  FaPlayCircle, 
  FaTrophy
} from 'react-icons/fa';

const QuizList = ({ quizzes, courseId }) => {
  const navigate = useNavigate();

  const handleStartQuiz = (quizId) => {
    navigate(`/courses/${courseId}/quizzes/${quizId}`);
  };

  if (!quizzes.length) {
    return (
      <div className="text-center py-4">
        <h5 className="text-muted">No quizzes available for this course.</h5>
      </div>
    );
  }

  return (
    <ListGroup variant="flush">
      {quizzes.map((quiz) => (
        <ListGroup.Item 
          key={quiz.quizId}
          className="d-flex justify-content-between align-items-center py-3"
        >
          <div>
            <div className="d-flex align-items-center">
              {quiz.isCompleted ? (
                <FaCheckCircle className="text-success me-2" />
              ) : (
                <FaPlayCircle className="text-primary me-2" />
              )}
              <h5 className="mb-0">{quiz.title}</h5>
            </div>
            <p className="text-muted small mb-0 mt-1">
              {quiz.description || `Quiz #${quiz.orderIndex + 1}`} - {quiz.questionCount} questions
            </p>
          </div>

          <div className="d-flex align-items-center">
            {quiz.highestScore !== undefined && quiz.highestScore > 0 && (
              <div className="me-3 text-center">
                <div className="d-flex align-items-center">
                  <FaTrophy className="text-warning me-1" />
                  <span className="fw-bold">{quiz.highestScore}%</span>
                </div>
                <small className="text-muted">Best Score</small>
              </div>
            )}

            <Badge 
              bg={quiz.isCompleted ? 'success' : 'secondary'} 
              className="me-3"
            >
              {quiz.isCompleted ? 'Completed' : 'Not Completed'}
            </Badge>

            <Button 
              variant={quiz.isCompleted ? 'outline-primary' : 'primary'} 
              size="sm"
              onClick={() => handleStartQuiz(quiz.quizId)}
            >
              {quiz.isCompleted ? 'Retake Quiz' : 'Start Quiz'}
            </Button>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default QuizList;




