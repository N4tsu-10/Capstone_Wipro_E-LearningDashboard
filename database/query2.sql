-- Insert Quizzes for Database Design and SQL Course (CourseId: 4)
INSERT INTO Quizzes (CourseId, Title, Description, OrderIndex)
VALUES (4, 'Database Fundamentals', 'Test your knowledge of database design fundamentals.', 1);
DECLARE @DbFundamentalsQuizId INT = SCOPE_IDENTITY();

INSERT INTO Quizzes (CourseId, Title, Description, OrderIndex)
VALUES (4, 'SQL Basics', 'Test your understanding of basic SQL queries.', 2);
DECLARE @SqlBasicsQuizId INT = SCOPE_IDENTITY();

INSERT INTO Quizzes (CourseId, Title, Description, OrderIndex)
VALUES (4, 'Advanced SQL', 'Test your knowledge of advanced SQL operations and optimization.', 3);
DECLARE @AdvSqlQuizId INT = SCOPE_IDENTITY();

-- Insert Quizzes for Full Stack Development with MERN Course (CourseId: 5)
INSERT INTO Quizzes (CourseId, Title, Description, OrderIndex)
VALUES (5, 'MongoDB Basics', 'Test your understanding of MongoDB and NoSQL databases.', 1);
DECLARE @MongoQuizId INT = SCOPE_IDENTITY();

INSERT INTO Quizzes (CourseId, Title, Description, OrderIndex)
VALUES (5, 'Express and Node.js', 'Test your knowledge of backend development with Express.', 2);
DECLARE @ExpressQuizId INT = SCOPE_IDENTITY();

INSERT INTO Quizzes (CourseId, Title, Description, OrderIndex)
VALUES (5, 'React and Redux', 'Test your understanding of frontend development with React.', 3);
DECLARE @ReactQuizId INT = SCOPE_IDENTITY();

-- Insert Questions and Answer Options for Database Fundamentals Quiz
INSERT INTO Questions (QuizId, QuestionText, OrderIndex)
VALUES (@DbFundamentalsQuizId, 'What does RDBMS stand for?', 1);
DECLARE @Question1Id INT = SCOPE_IDENTITY();

INSERT INTO AnswerOptions (QuestionId, OptionText, IsCorrect, OrderIndex)
VALUES 
(@Question1Id, 'Relational Database Management System', 1, 1),
(@Question1Id, 'Rapid Database Management System', 0, 2),
(@Question1Id, 'Referential Database Model System', 0, 3),
(@Question1Id, 'Remote Database Management Server', 0, 4);

INSERT INTO Questions (QuizId, QuestionText, OrderIndex)
VALUES (@DbFundamentalsQuizId, 'Which normal form requires that all non-key attributes be dependent on the primary key?', 2);
DECLARE @Question2Id INT = SCOPE_IDENTITY();

INSERT INTO AnswerOptions (QuestionId, OptionText, IsCorrect, OrderIndex)
VALUES 
(@Question2Id, 'First Normal Form (1NF)', 0, 1),
(@Question2Id, 'Second Normal Form (2NF)', 1, 2),
(@Question2Id, 'Third Normal Form (3NF)', 0, 3),
(@Question2Id, 'Boyce-Codd Normal Form (BCNF)', 0, 4);

-- Insert Questions and Answer Options for SQL Basics Quiz
INSERT INTO Questions (QuizId, QuestionText, OrderIndex)
VALUES (@SqlBasicsQuizId, 'Which SQL clause is used to filter records?', 1);
DECLARE @Question3Id INT = SCOPE_IDENTITY();

INSERT INTO AnswerOptions (QuestionId, OptionText, IsCorrect, OrderIndex)
VALUES 
(@Question3Id, 'WHERE', 1, 1),
(@Question3Id, 'HAVING', 0, 2),
(@Question3Id, 'GROUP BY', 0, 3),
(@Question3Id, 'ORDER BY', 0, 4);

INSERT INTO Questions (QuizId, QuestionText, OrderIndex)
VALUES (@SqlBasicsQuizId, 'Which join type returns rows when there is at least one match in both tables?', 2);
DECLARE @Question4Id INT = SCOPE_IDENTITY();

INSERT INTO AnswerOptions (QuestionId, OptionText, IsCorrect, OrderIndex)
VALUES 
(@Question4Id, 'INNER JOIN', 1, 1),
(@Question4Id, 'LEFT JOIN', 0, 2),
(@Question4Id, 'RIGHT JOIN', 0, 3),
(@Question4Id, 'FULL JOIN', 0, 4);

-- Add questions for Advanced SQL Quiz
INSERT INTO Questions (QuizId, QuestionText, OrderIndex)
VALUES (@AdvSqlQuizId, 'Which SQL statement is used to create an index?', 1);
DECLARE @Question5Id INT = SCOPE_IDENTITY();

INSERT INTO AnswerOptions (QuestionId, OptionText, IsCorrect, OrderIndex)
VALUES 
(@Question5Id, 'CREATE INDEX', 1, 1),
(@Question5Id, 'MAKE INDEX', 0, 2),
(@Question5Id, 'ADD INDEX', 0, 3),
(@Question5Id, 'INSERT INDEX', 0, 4);

-- Add Questions for MongoDB Basics
INSERT INTO Questions (QuizId, QuestionText, OrderIndex)
VALUES (@MongoQuizId, 'What type of database is MongoDB?', 1);
DECLARE @Question6Id INT = SCOPE_IDENTITY();

INSERT INTO AnswerOptions (QuestionId, OptionText, IsCorrect, OrderIndex)
VALUES 
(@Question6Id, 'Relational database', 0, 1),
(@Question6Id, 'NoSQL document database', 1, 2),
(@Question6Id, 'Graph database', 0, 3),
(@Question6Id, 'Columnar database', 0, 4);

-- Add Questions for Express and Node.js
INSERT INTO Questions (QuizId, QuestionText, OrderIndex)
VALUES (@ExpressQuizId, 'What is Express.js?', 1);
DECLARE @Question7Id INT = SCOPE_IDENTITY();

INSERT INTO AnswerOptions (QuestionId, OptionText, IsCorrect, OrderIndex)
VALUES 
(@Question7Id, 'A database system', 0, 1),
(@Question7Id, 'A web application framework for Node.js', 1, 2),
(@Question7Id, 'A JavaScript runtime', 0, 3),
(@Question7Id, 'A frontend library', 0, 4);

-- Add Questions for React and Redux
INSERT INTO Questions (QuizId, QuestionText, OrderIndex)
VALUES (@ReactQuizId, 'What function is used to update state in a React functional component?', 1);
DECLARE @Question8Id INT = SCOPE_IDENTITY();

INSERT INTO AnswerOptions (QuestionId, OptionText, IsCorrect, OrderIndex)
VALUES 
(@Question8Id, 'this.setState()', 0, 1),
(@Question8Id, 'useState()', 1, 2),
(@Question8Id, 'changeState()', 0, 3),
(@Question8Id, 'modifyState()', 0, 4);