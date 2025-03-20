// src/components/quizzes/QuizQuestion.js
import React from 'react';
import { Card, Form } from 'react-bootstrap';

const QuizQuestion = ({ 
  question,
  questionIndex,
  selectedAnswer,
  onAnswerSelect
}) => {
  const handleChange = (e) => {
    onAnswerSelect(question.questionId, parseInt(e.target.value));
  };

  return (
    <Card className="mb-4">
      <Card.Header>
        <h5 className="mb-0">Question {questionIndex + 1}</h5>
      </Card.Header>
      <Card.Body>
        <p className="mb-4">{question.questionText}</p>
        
        <Form>
          {question.answerOptions.map((option) => (
            <Form.Check
              key={option.answerOptionId}
              type="radio"
              id={`q${question.questionId}-a${option.answerOptionId}`}
              name={`question-${question.questionId}`}
              value={option.answerOptionId}
              label={option.optionText}
              checked={selectedAnswer === option.answerOptionId}
              onChange={handleChange}
              className="mb-2"
            />
          ))}
        </Form>
      </Card.Body>
    </Card>
  );
};

export default QuizQuestion;