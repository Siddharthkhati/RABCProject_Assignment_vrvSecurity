Introduction 🎯

The RBAC System (Role-Based Access Control) is a web application built using Node.js, Express, React, Mongoose, and Vite. It is designed to manage user authentication and authorization, allowing users to be assigned multiple roles such as Admin, Teacher, and Student.

In this application:

-  Email Uniqueness: Users cannot have multiple accounts with the same email. If an email is used, only the active user can be assigned to it, and all other users with the same email will have their status set to inactive.
-  User Roles: Users can have one or more roles (Admin, Teacher, Student) and can be easily managed from the backend.
-  Status Management: When a user is created or updated, their status is automatically set to active, while all other users with the same email are set to inactive.

This application follows a separation of concerns with a frontend and backend, utilizing the MVC architecture for clean and organized code.

Features ⭐

-  User Authentication: Enforces email uniqueness for sign-up, ensuring only one active account per email.
-  Role Management: Users can have multiple roles like Admin, Teacher, and Student.
-  Status Management: Automatically set the newly added user's status to active and others to inactive.
-  Frontend and Backend Separation: Clean separation of frontend (React + Vite) and backend (Node.js + Express).
-  Database Integration: Uses MongoDB with Mongoose for storing user data and managing roles.

Tech Stack 🛠️

-  Frontend: React, Vite (for fast development and build)
-  Backend: Node.js, Express.js
-  Database: MongoDB, Mongoose
-  Environment Management: .env for configuration management

Installation 🔧

Prerequisites:

    Node.js (v14 or later)
    MongoDB (MongoDB Atlas)

Steps:

-  Clone the Repository:

    git clone https://github.com/yourusername/rbac-system
    Install Dependencies: Navigate to both the frontend and backend directories and install the required dependencies.

-  For the Backend:

    cd backend
    npm install

-  For the Frontend:

    cd frontend
    npm install

-  Set Up Environment Variables: Create a .env file in both the frontend and backend directories and add the following configuration:

-  Backend .env file:

    PORT=8000
    DB_URL=mongodb+srv://<username>:<password>@<databasename>.ebhjh.mongodb.net/?retryWrites=true&w=majority&appName=<databasename>
    

-  Start the Backend: Navigate to the backend directory and run:

    cd backend
    npm run dev
-  Start the Frontend: Navigate to the frontend directory and run:

    cd frontend
    npm run dev

This will start both the backend and frontend, and you can now access the application by visiting http://localhost:8000 in your browser.

Usage 🚀

- Authentication: Sign up using your email and password. If an email is already registered, you will be notified. Only one active user can exist with a particular email.
- Role Management: Assign multiple roles (Admin, Teacher, Student) to each user. 
- User Status: Whenever a new user is added, their status is automatically set to active and any other user with the same email will have their status updated to inactive.
