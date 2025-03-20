-- Database Setup for E-Learning Dashboard
-- SQL Server

-- Create Database
CREATE DATABASE ELearningDB;
GO

USE ELearningDB;
GO

-- Create Users Table
CREATE TABLE Users (
    UserId INT PRIMARY KEY IDENTITY(1,1),
    Username NVARCHAR(50) NOT NULL UNIQUE,
    Email NVARCHAR(100) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(256) NOT NULL,
    PasswordSalt NVARCHAR(256) NOT NULL,
    FirstName NVARCHAR(50),
    LastName NVARCHAR(50),
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    UpdatedAt DATETIME NOT NULL DEFAULT GETDATE()
);
GO

-- Create Courses Table
CREATE TABLE Courses (
    CourseId INT PRIMARY KEY IDENTITY(1,1),
    Title NVARCHAR(100) NOT NULL,
    Description NVARCHAR(500),
    ImageUrl NVARCHAR(255),
    Duration INT, -- in minutes
    Level NVARCHAR(50), -- Beginner, Intermediate, Advanced
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    UpdatedAt DATETIME NOT NULL DEFAULT GETDATE()
);
GO

-- Create EnrolledCourses Table (Join table for Users and Courses)
CREATE TABLE EnrolledCourses (
    EnrollmentId INT PRIMARY KEY IDENTITY(1,1),
    UserId INT NOT NULL,
    CourseId INT NOT NULL,
    EnrollmentDate DATETIME NOT NULL DEFAULT GETDATE(),
    Progress FLOAT DEFAULT 0, -- 0 to 100 percentage
    CompletedAt DATETIME NULL,
    FOREIGN KEY (UserId) REFERENCES Users(UserId),
    FOREIGN KEY (CourseId) REFERENCES Courses(CourseId),
    CONSTRAINT UC_UserCourse UNIQUE (UserId, CourseId)
);
GO

-- Create Quizzes Table
CREATE TABLE Quizzes (
    QuizId INT PRIMARY KEY IDENTITY(1,1),
    CourseId INT NOT NULL,
    Title NVARCHAR(100) NOT NULL,
    Description NVARCHAR(500),
    OrderIndex INT NOT NULL, -- To maintain the order of quizzes within a course
    PassingScore INT NOT NULL DEFAULT 70, -- Percentage needed to pass
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    UpdatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    FOREIGN KEY (CourseId) REFERENCES Courses(CourseId)
);
GO

-- Create Questions Table
CREATE TABLE Questions (
    QuestionId INT PRIMARY KEY IDENTITY(1,1),
    QuizId INT NOT NULL,
    QuestionText NVARCHAR(500) NOT NULL,
    OrderIndex INT NOT NULL, -- To maintain the order of questions within a quiz
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    UpdatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    FOREIGN KEY (QuizId) REFERENCES Quizzes(QuizId)
);
GO

-- Create AnswerOptions Table
CREATE TABLE AnswerOptions (
    AnswerOptionId INT PRIMARY KEY IDENTITY(1,1),
    QuestionId INT NOT NULL,
    OptionText NVARCHAR(255) NOT NULL,
    IsCorrect BIT NOT NULL DEFAULT 0,
    OrderIndex INT NOT NULL, -- To maintain the order of options
    FOREIGN KEY (QuestionId) REFERENCES Questions(QuestionId)
);
GO

-- Create UserQuizAttempts Table
CREATE TABLE UserQuizAttempts (
    AttemptId INT PRIMARY KEY IDENTITY(1,1),
    UserId INT NOT NULL,
    QuizId INT NOT NULL,
    AttemptDate DATETIME NOT NULL DEFAULT GETDATE(),
    Score INT NOT NULL, -- Score as a percentage
    TimeTaken INT, -- Time taken in seconds
    Passed BIT NOT NULL DEFAULT 0,
    FOREIGN KEY (UserId) REFERENCES Users(UserId),
    FOREIGN KEY (QuizId) REFERENCES Quizzes(QuizId)
);
GO

-- Create UserAnswers Table
CREATE TABLE UserAnswers (
    UserAnswerId INT PRIMARY KEY IDENTITY(1,1),
    AttemptId INT NOT NULL,
    QuestionId INT NOT NULL,
    AnswerOptionId INT NOT NULL,
    FOREIGN KEY (AttemptId) REFERENCES UserQuizAttempts(AttemptId),
    FOREIGN KEY (QuestionId) REFERENCES Questions(QuestionId),
    FOREIGN KEY (AnswerOptionId) REFERENCES AnswerOptions(AnswerOptionId)
);
GO

-- Seed Data for the Database
-- Inserting Courses
INSERT INTO Courses (Title, Description, ImageUrl, Duration, Level)
VALUES 
('Introduction to Web Development', 'Learn the fundamentals of HTML, CSS, and JavaScript to build modern websites.', 'https://www.mtoag.com/wp-content/uploads/2024/05/Introduction-feature1.png', 720, 'Beginner'),
('Advanced React Development', 'Master React and learn how to build complex frontend applications.', 'https://i.ytimg.com/vi/MfIoAG3e7p4/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCowKte0iwbSkc3VARugPYBNoIqaA', 900, 'Advanced'),
('ASP.NET Core Fundamentals', 'Learn the basics of building web applications with ASP.NET Core.', 'https://blog.seekdotnet.com/wp-content/uploads/2018/05/ASP.NET-Core-Fundamentals.png', 840, 'Intermediate'),
('Database Design and SQL', 'Understand database design principles and write efficient SQL queries.', 'https://i.ytimg.com/vi/6V4miYuD4lA/maxresdefault.jpg', 660, 'Intermediate'),
('Full Stack Development with MERN', 'Build full stack applications using MongoDB, Express, React, and Node.js.', 'https://www.developerguru.in/images/courses/mern_stack.gif', 1080, 'Advanced');
GO

-- Inserting Quizzes for Web Development Course
INSERT INTO Quizzes (CourseId, Title, Description, OrderIndex)
VALUES 
(1, 'HTML Basics', 'Test your knowledge of HTML fundamentals.', 1),
(1, 'CSS Styling', 'Test your understanding of CSS and styling concepts.', 2),
(1, 'JavaScript Fundamentals', 'Test your JavaScript skills and knowledge.', 3);
GO

-- Inserting Quizzes for React Course
INSERT INTO Quizzes (CourseId, Title, Description, OrderIndex)
VALUES 
(2, 'React Components', 'Test your understanding of React components.', 1),
(2, 'State and Props', 'Test your knowledge of state management and props in React.', 2),
(2, 'Hooks and Context API', 'Test your understanding of React Hooks and Context API.', 3);
GO

-- Inserting Quizzes for ASP.NET Course
INSERT INTO Quizzes (CourseId, Title, Description, OrderIndex)
VALUES 
(3, 'ASP.NET Core Basics', 'Test your knowledge of ASP.NET Core fundamentals.', 1),
(3, 'MVC Pattern', 'Test your understanding of the MVC architecture in ASP.NET Core.', 2),
(3, 'Entity Framework Core', 'Test your knowledge of Entity Framework Core and data access.', 3);
GO

-- Inserting Questions for HTML Basics Quiz
INSERT INTO Questions (QuizId, QuestionText, OrderIndex)
VALUES 
(1, 'What does HTML stand for?', 1),
(1, 'Which HTML element defines the title of a document?', 2),
(1, 'Which HTML attribute specifies an alternate text for an image?', 3),
(1, 'What is the correct HTML element for inserting a line break?', 4),
(1, 'How can you create a numbered list in HTML?', 5);
GO

-- Answer Options for HTML Questions
-- Question 1: What does HTML stand for?
INSERT INTO AnswerOptions (QuestionId, OptionText, IsCorrect, OrderIndex)
VALUES 
(1, 'Hyper Text Markup Language', 1, 1),
(1, 'High Tech Modern Language', 0, 2),
(1, 'Hyperlinks and Text Markup Language', 0, 3),
(1, 'Home Tool Markup Language', 0, 4);
GO

-- Question 2: Which HTML element defines the title of a document?
INSERT INTO AnswerOptions (QuestionId, OptionText, IsCorrect, OrderIndex)
VALUES 
(2, '<title>', 1, 1),
(2, '<head>', 0, 2),
(2, '<meta>', 0, 3),
(2, '<header>', 0, 4);
GO

-- Question 3: Which HTML attribute specifies an alternate text for an image?
INSERT INTO AnswerOptions (QuestionId, OptionText, IsCorrect, OrderIndex)
VALUES 
(3, 'alt', 1, 1),
(3, 'title', 0, 2),
(3, 'src', 0, 3),
(3, 'href', 0, 4);
GO

-- Question 4: What is the correct HTML element for inserting a line break?
INSERT INTO AnswerOptions (QuestionId, OptionText, IsCorrect, OrderIndex)
VALUES 
(4, '<br>', 1, 1),
(4, '<break>', 0, 2),
(4, '<lb>', 0, 3),
(4, '<newline>', 0, 4);
GO

-- Question 5: How can you create a numbered list in HTML?
INSERT INTO AnswerOptions (QuestionId, OptionText, IsCorrect, OrderIndex)
VALUES 
(5, '<ol>', 1, 1),
(5, '<ul>', 0, 2),
(5, '<list>', 0, 3),
(5, '<dl>', 0, 4);
GO

-- Insert more questions and answers for other quizzes
-- CSS Styling Quiz (QuizId: 2)
INSERT INTO Questions (QuizId, QuestionText, OrderIndex)
VALUES 
(2, 'What does CSS stand for?', 1),
(2, 'Which property is used to change the background color?', 2),
(2, 'How do you select an element with id "demo"?', 3);
GO

-- Answer Options for CSS Questions
INSERT INTO AnswerOptions (QuestionId, OptionText, IsCorrect, OrderIndex)
VALUES 
(6, 'Cascading Style Sheets', 1, 1),
(6, 'Computer Style Sheets', 0, 2),
(6, 'Creative Style Sheets', 0, 3),
(6, 'Colorful Style Sheets', 0, 4),

(7, 'background-color', 1, 1),
(7, 'bgcolor', 0, 2),
(7, 'color-background', 0, 3),
(7, 'color', 0, 4),

(8, '#demo', 1, 1),
(8, '.demo', 0, 2),
(8, 'demo', 0, 3),
(8, '*demo', 0, 4);
GO

-- JavaScript Fundamentals Quiz (QuizId: 3)
INSERT INTO Questions (QuizId, QuestionText, OrderIndex)
VALUES 
(3, 'What is JavaScript?', 1),
(3, 'Which operator is used to assign a value to a variable?', 2),
(3, 'How do you create a function in JavaScript?', 3);
GO

-- Answer Options for JavaScript Questions
INSERT INTO AnswerOptions (QuestionId, OptionText, IsCorrect, OrderIndex)
VALUES 
(9, 'A programming language for the web', 1, 1),
(9, 'A markup language', 0, 2),
(9, 'A database language', 0, 3),
(9, 'A styling language', 0, 4),

(10, '=', 1, 1),
(10, '*', 0, 2),
(10, '-', 0, 3),
(10, 'x', 0, 4),

(11, 'function myFunction()', 1, 1),
(11, 'create myFunction()', 0, 2),
(11, 'new.function()', 0, 3),
(11, 'function:myFunction()', 0, 4);
GO

-- Add similar questions and answer options for the remaining quizzes
-- This is a simplified version of the seed data
-- In a production environment, you would add more comprehensive quiz content

-- Create Stored Procedures
-- Procedure to update course progress when a quiz is completed
CREATE PROCEDURE UpdateCourseProgress
    @UserId INT,
    @CourseId INT
AS
BEGIN
    DECLARE @TotalQuizzes FLOAT;
    DECLARE @CompletedQuizzes FLOAT;
    DECLARE @Progress FLOAT;
    
    -- Get total number of quizzes for the course
    SELECT @TotalQuizzes = COUNT(QuizId)
    FROM Quizzes
    WHERE CourseId = @CourseId;
    
    -- Get number of completed/passed quizzes for the user in this course
    SELECT @CompletedQuizzes = COUNT(DISTINCT uqa.QuizId)
    FROM UserQuizAttempts uqa
    JOIN Quizzes q ON uqa.QuizId = q.QuizId
    WHERE uqa.UserId = @UserId
      AND q.CourseId = @CourseId
      AND uqa.Passed = 1;
    
    -- Calculate progress percentage
    IF @TotalQuizzes > 0
        SET @Progress = (@CompletedQuizzes / @TotalQuizzes) * 100;
    ELSE
        SET @Progress = 0;
    
    -- Update the enrolled course record
    UPDATE EnrolledCourses
    SET Progress = @Progress,
        CompletedAt = CASE 
                        WHEN @Progress >= 100 THEN GETDATE()
                        ELSE NULL
                      END
    WHERE UserId = @UserId
      AND CourseId = @CourseId;
END;
GO

-- Create Indexes for Performance
CREATE INDEX IX_Questions_QuizId ON Questions(QuizId);
CREATE INDEX IX_AnswerOptions_QuestionId ON AnswerOptions(QuestionId);
CREATE INDEX IX_Quizzes_CourseId ON Quizzes(CourseId);
CREATE INDEX IX_EnrolledCourses_UserId ON EnrolledCourses(UserId);
CREATE INDEX IX_EnrolledCourses_CourseId ON EnrolledCourses(CourseId);
CREATE INDEX IX_UserQuizAttempts_UserId ON UserQuizAttempts(UserId);
CREATE INDEX IX_UserQuizAttempts_QuizId ON UserQuizAttempts(QuizId);
GO