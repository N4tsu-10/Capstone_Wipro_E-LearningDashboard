-- Add questions for React Components Quiz (CourseId: 2, QuizId: 4)
INSERT INTO Questions (QuizId, QuestionText, OrderIndex)
VALUES (4, 'What is a React component?', 1);
DECLARE @ReactQ1Id INT = SCOPE_IDENTITY();

INSERT INTO AnswerOptions (QuestionId, OptionText, IsCorrect, OrderIndex)
VALUES 
(@ReactQ1Id, 'A reusable piece of UI code', 1, 1),
(@ReactQ1Id, 'A JavaScript library', 0, 2),
(@ReactQ1Id, 'A CSS framework', 0, 3),
(@ReactQ1Id, 'A database query', 0, 4);

INSERT INTO Questions (QuizId, QuestionText, OrderIndex)
VALUES (4, 'How do you create a functional component in React?', 2);
DECLARE @ReactQ2Id INT = SCOPE_IDENTITY();

INSERT INTO AnswerOptions (QuestionId, OptionText, IsCorrect, OrderIndex)
VALUES 
(@ReactQ2Id, 'function MyComponent() { return <div></div>; }', 1, 1),
(@ReactQ2Id, 'class MyComponent extends React {}', 0, 2),
(@ReactQ2Id, 'const MyComponent = new Component()', 0, 3),
(@ReactQ2Id, 'React.createComponent("MyComponent")', 0, 4);

-- Add questions for State and Props Quiz (CourseId: 2, QuizId: 5)
INSERT INTO Questions (QuizId, QuestionText, OrderIndex)
VALUES (5, 'What are props in React?', 1);
DECLARE @ReactQ3Id INT = SCOPE_IDENTITY();

INSERT INTO AnswerOptions (QuestionId, OptionText, IsCorrect, OrderIndex)
VALUES 
(@ReactQ3Id, 'Properties passed to a component', 1, 1),
(@ReactQ3Id, 'Internal data storage', 0, 2),
(@ReactQ3Id, 'CSS properties', 0, 3),
(@ReactQ3Id, 'HTML attributes', 0, 4);

INSERT INTO Questions (QuizId, QuestionText, OrderIndex)
VALUES (5, 'How do you set state in a class component?', 2);
DECLARE @ReactQ4Id INT = SCOPE_IDENTITY();

INSERT INTO AnswerOptions (QuestionId, OptionText, IsCorrect, OrderIndex)
VALUES 
(@ReactQ4Id, 'this.setState()', 1, 1),
(@ReactQ4Id, 'this.state = {}', 0, 2),
(@ReactQ4Id, 'setState(this)', 0, 3),
(@ReactQ4Id, 'this.props.state()', 0, 4);

-- Add questions for Hooks and Context API Quiz (CourseId: 2, QuizId: 6)
INSERT INTO Questions (QuizId, QuestionText, OrderIndex)
VALUES (6, 'What is the useState hook used for?', 1);
DECLARE @ReactQ5Id INT = SCOPE_IDENTITY();

INSERT INTO AnswerOptions (QuestionId, OptionText, IsCorrect, OrderIndex)
VALUES 
(@ReactQ5Id, 'Adding state to functional components', 1, 1),
(@ReactQ5Id, 'Creating class components', 0, 2),
(@ReactQ5Id, 'Handling HTTP requests', 0, 3),
(@ReactQ5Id, 'Styling components', 0, 4);

-- Add questions for ASP.NET Core Basics Quiz (CourseId: 3, QuizId: 7)
INSERT INTO Questions (QuizId, QuestionText, OrderIndex)
VALUES (7, 'What is ASP.NET Core?', 1);
DECLARE @AspNetQ1Id INT = SCOPE_IDENTITY();

INSERT INTO AnswerOptions (QuestionId, OptionText, IsCorrect, OrderIndex)
VALUES 
(@AspNetQ1Id, 'A cross-platform web framework', 1, 1),
(@AspNetQ1Id, 'A database system', 0, 2),
(@AspNetQ1Id, 'A JavaScript library', 0, 3),
(@AspNetQ1Id, 'A programming language', 0, 4);

INSERT INTO Questions (QuizId, QuestionText, OrderIndex)
VALUES (7, 'Which file is used to configure services in ASP.NET Core?', 2);
DECLARE @AspNetQ2Id INT = SCOPE_IDENTITY();

INSERT INTO AnswerOptions (QuestionId, OptionText, IsCorrect, OrderIndex)
VALUES 
(@AspNetQ2Id, 'Program.cs', 1, 1),
(@AspNetQ2Id, 'web.config', 0, 2),
(@AspNetQ2Id, 'Global.asax', 0, 3),
(@AspNetQ2Id, 'index.html', 0, 4);

-- Add questions for MVC Pattern Quiz (CourseId: 3, QuizId: 8)
INSERT INTO Questions (QuizId, QuestionText, OrderIndex)
VALUES (8, 'What does MVC stand for?', 1);
DECLARE @AspNetQ3Id INT = SCOPE_IDENTITY();

INSERT INTO AnswerOptions (QuestionId, OptionText, IsCorrect, OrderIndex)
VALUES 
(@AspNetQ3Id, 'Model-View-Controller', 1, 1),
(@AspNetQ3Id, 'Microsoft Visual Components', 0, 2),
(@AspNetQ3Id, 'Main-View-Control', 0, 3),
(@AspNetQ3Id, 'Multiple View Compiler', 0, 4);

-- Add questions for Entity Framework Core Quiz (CourseId: 3, QuizId: 9)
INSERT INTO Questions (QuizId, QuestionText, OrderIndex)
VALUES (9, 'What is Entity Framework Core?', 1);
DECLARE @AspNetQ4Id INT = SCOPE_IDENTITY();

INSERT INTO AnswerOptions (QuestionId, OptionText, IsCorrect, OrderIndex)
VALUES 
(@AspNetQ4Id, 'An ORM (Object-Relational Mapper)', 1, 1),
(@AspNetQ4Id, 'A JavaScript framework', 0, 2),
(@AspNetQ4Id, 'A UI component library', 0, 3),
(@AspNetQ4Id, 'A testing framework', 0, 4);

INSERT INTO Questions (QuizId, QuestionText, OrderIndex)
VALUES (9, 'Which approach maps existing database tables to entity classes?', 2);
DECLARE @AspNetQ5Id INT = SCOPE_IDENTITY();

INSERT INTO AnswerOptions (QuestionId, OptionText, IsCorrect, OrderIndex)
VALUES 
(@AspNetQ5Id, 'Database-First', 1, 1),
(@AspNetQ5Id, 'Code-First', 0, 2),
(@AspNetQ5Id, 'Model-First', 0, 3),
(@AspNetQ5Id, 'Hybrid-Approach', 0, 4);