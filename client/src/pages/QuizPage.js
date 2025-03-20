// src/pages/QuizPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Card, Button, ProgressBar, Breadcrumb } from 'react-bootstrap';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { getQuizDetails, submitQuiz, clearQuizResult } from '../store/slices/quizSlice';
import QuizQuestion from '../components/quizzes/QuizQuestion';
import QuizResult from '../components/quizzes/QuizResult';
import QuizTimer from '../components/quizzes/QuizTimer';
import Loader from '../components/layout/Loader';

const QuizPage = () => {
  const { courseId, quizId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { currentQuiz, quizResult, isLoading } = useSelector((state) => state.quizzes);
  
  const [userAnswers, setUserAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  useEffect(() => {
    if (parseInt(quizId)) {
      dispatch(getQuizDetails(parseInt(quizId)));
      dispatch(clearQuizResult());
    }
    
    // Reset answers when quiz changes
    setUserAnswers({});
    setCurrentQuestionIndex(0);
  }, [dispatch, quizId]);
  
  const handleAnswerSelect = (questionId, answerId) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answerId
    }));
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const handleSubmitQuiz = (timeTaken = null) => {
    const submission = {
      quizId: parseInt(quizId),
      answers: Object.entries(userAnswers).map(([questionId, answerOptionId]) => ({
        questionId: parseInt(questionId),
        answerOptionId: answerOptionId
      })),
      timeTaken: timeTaken
    };
    
    dispatch(submitQuiz(submission));
  };
  
  if (isLoading || !currentQuiz) {
    return <Loader />;
  }
  
  if (quizResult) {
    return (
      <Container>
        <QuizResult 
          result={quizResult} 
          quizId={parseInt(quizId)} 
          courseId={parseInt(courseId)} 
        />
      </Container>
    );
  }
  
  const currentQuestion = currentQuiz.questions[currentQuestionIndex];
  const answeredQuestionsCount = Object.keys(userAnswers).length;
  const totalQuestions = currentQuiz.questions.length;
  const progressPercentage = (answeredQuestionsCount / totalQuestions) * 100;
  
  return (
    <Container>
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/courses" }}>Courses</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: `/courses/${courseId}` }}>
          Course Details
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{currentQuiz.title}</Breadcrumb.Item>
      </Breadcrumb>
      
      <Card className="mb-4">
        <Card.Header>
          <div className="d-flex justify-content-between align-items-center">
            <h3>{currentQuiz.title}</h3>
            <Button 
              variant="outline-primary" 
              as={Link}
              to={`/courses/${courseId}`}
            >
              <FaArrowLeft className="me-2" /> Back to Course
            </Button>
          </div>
          <p className="text-muted mb-0">{currentQuiz.description}</p>
        </Card.Header>
        <Card.Body>
          <div className="mb-4">
            <div className="d-flex justify-content-between mb-2">
              <div>
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </div>
              <div>
                {answeredQuestionsCount} of {totalQuestions} answered
              </div>
            </div>
            <ProgressBar now={progressPercentage} variant="primary" />
          </div>
          
          <QuizTimer
            onTimerEnd={handleSubmitQuiz}
            duration={600} // 10 minutes
          />
          
          {currentQuestion && (
            <QuizQuestion
              question={currentQuestion}
              questionIndex={currentQuestionIndex}
              selectedAnswer={userAnswers[currentQuestion.questionId]}
              onAnswerSelect={handleAnswerSelect}
            />
          )}
          
          <div className="d-flex justify-content-between">
            <Button
              variant="outline-primary"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              <FaArrowLeft className="me-2" /> Previous
            </Button>
            
            {currentQuestionIndex === totalQuestions - 1 ? (
              <Button
                variant="success"
                onClick={() => handleSubmitQuiz()}
                disabled={answeredQuestionsCount !== totalQuestions}
              >
                Submit Quiz
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={handleNext}
              >
                Next <FaArrowRight className="ms-2" />
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default QuizPage;