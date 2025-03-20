# E-Learning_Dashboard
Capstone Project made during Wipro Phase 2 training. In this project I have create a User Dashboard, with login and register authentication, on which user can enroll in different courses and attempt quizzes to gain more knowledge. And the User Dashboard will show the overall progress of all the courses the User has enrolled in.    

To RUN THE PROJECT:

DATABASE

Step 1: All Sql queries are provided in database folder, execute them in the order I am mentioning below.

Step 2: Run the setup.sql file first.

Step 3: Run query2.sql.

Step 4: Run query3.sql.


BACKEND

Step 1: Setup the Backend code provided in VS Code as I have done it in VS Code only. Use ASP.Net Core Web API with .net version 8.

Step 2: Install all the nuget packages with the same versions provided : 
   > Microsoft.AspNetCore.Authentication.JwtBearer      8.0.2      
   > Microsoft.AspNetCore.OpenApi                       9.0.1       
   > Microsoft.EntityFrameworkCore                      8.0.2       
   > Microsoft.EntityFrameworkCore.Design               8.0.2       
   > Microsoft.EntityFrameworkCore.SqlServer            8.0.2       
   > Swashbuckle.AspNetCore                             7.3.1       
   > System.IdentityModel.Tokens.Jwt                    7.3.1

Step 3: Change the Server name in appsettings.json :

   "DefaultConnection": "Server=Your_Server_Name;Database=ELearningDB;Trusted_Connection=True;MultipleActiveResultSets=true;TrustServerCertificate=True"

Step 4: No need to run Migrations as SQL Database is already setup just Make Sure You Have Included the ApplicationDbContext.cs.

Step 5: Backend is ALL SET!!

Step 6: TO RUN USE COMMAND dotnet run 

NOTE: Make sure you use the same file directory setup and naming.



FRONTEND

Step 1: Setup the Frontend code provided in VS Code with React version 19.

Step 2: Install all the dependencies with same versions : 
npm install
npm install @reduxjs/toolkit react-redux react-router-dom axios bootstrap react-bootstrap
npm install formik yup react-icons react-toastify chart.js react-chartjs-2

Step 3: FrontEnd is ALL SET!!

Step 4: TO RUN USE COMMAND npm start

NOTE: Make sure you use the same file directory setup and naming.


MAKE SURE ALL THE THREE THINGS ARE RUNNING AT THE SAME TIME SEAMLESS EXECUTION.


