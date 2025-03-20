// src/components/quizzes/QuizResult.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Row, Col, ProgressBar } from 'react-bootstrap';
import { 
  FaCheckCircle, 
  FaTimesCircle, 
  FaTrophy,
  FaChartLine,
  FaRedo,
  FaArrowRight
} from 'react-icons/fa';

const QuizResult = ({ result, quizId, courseId }) => {
  const { score, passed, courseProgress } = result;
  
  const getScoreVariant = () => {
    if (score >= 90) return 'success';
    if (score >= 70) return 'info';
    if (score >= 50) return 'warning';
    return 'danger';
  };

  return (
    <Card className="shadow-sm">
      <Card.Header className={`bg-${passed ? 'success' : 'danger'} bg-opacity-10 text-${passed ? 'success' : 'danger'}`}>
        <h4 className="mb-0 d-flex align-items-center">
          {passed ? (
            <>
              <FaCheckCircle className="me-2" />
              Quiz Passed!
            </>
          ) : (
            <>
              <FaTimesCircle className="me-2" />
              Quiz Failed
            </>
          )}
        </h4>
      </Card.Header>
      <Card.Body>
        <Row className="mb-4">
          <Col md={4} className="mb-3 mb-md-0">
            <div className="text-center">
              <div className="display-4 fw-bold text-primary">{score}%</div>
              <p className="text-muted">Your Score</p>
              <ProgressBar 
                now={score} 
                variant={getScoreVariant()} 
                className="mt-2" 
              />
            </div>
          </Col>
          
          <Col md={8}>
            <div className="d-flex flex-column h-100 justify-content-center">
              <div className="mb-3">
                <h5>
                  <FaTrophy className="text-warning me-2" />
                  {passed ? 'Congratulations!' : 'Keep Going!'}
                </h5>
                <p className="mb-0">
                  {passed 
                    ? 'You have successfully passed this quiz. Great job!' 
                    : 'You did not meet the passing score for this quiz. Try again!'}
                </p>
              </div>
              
              <div>
                <h5>
                  <FaChartLine className="text-info me-2" />
                  Course Progress
                </h5>
                <p className="mb-1">Your course progress has been updated.</p>
                <ProgressBar 
                  now={courseProgress} 
                  variant="info" 
                  className="mt-2" 
                  label={`${Math.round(courseProgress)}%`} 
                />
              </div>
            </div>
          </Col>
        </Row>
        
        <div className="d-flex justify-content-between">
          <Button 
            as={Link} 
            to={`/courses/${courseId}/quizzes/${quizId}`} 
            variant="outline-primary"
          >
            <FaRedo className="me-2" />
            Retake Quiz
          </Button>
          
          <Button 
            as={Link} 
            to={`/courses/${courseId}`} 
            variant="primary"
          >
            Back to Course <FaArrowRight className="ms-2" />
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default QuizResult;