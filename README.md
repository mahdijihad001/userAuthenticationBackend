# Backend Login & Registration System

This project implements a backend API for user registration, login, and authentication using Node.js, Express, bcrypt, and JWT.

## Features

- User registration with secure password hashing
- Login authentication with JWT token generation
- Protected route to retrieve user information

## Technologies Used

- Node.js
- Express.js
- bcrypt
- jsonwebtoken
- dotenv
- MongoDB with Mongoose

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB (local or MongoDB Atlas)

### Installation

1. Clone the repository:

    
    git clone https://github.com/your-username/backend-login-registration.git](https://github.com/mahdijihad001/SmTechnologyBackend
    
2. Navigate into the project directory:
    
    cd backend-login-registration
    
3. Install dependencies:
    
    npm install
    
4. Create a .env file in the root directory and add the following environment variables:
    
    MONGODB_URL="Your_mongodb_url"
    JWT_SECRET_KEY="secreat_key"
    
5. Start the development server:
   
   npm start
   
6. The server will start at http://localhost:3000

## API Endpoints
### POST /api/register
Registers a new user.
 #### Request body:
    {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
    }
Response: 
 - *201 created* on success
 - *User Already Exist* If existing user want to register again

### POST /api/login
Authenticates an existing user.
 #### Request body:
 
 {
  "email": "john@example.com",
  "password": "password123"
}
Response: 
  
  token: "jwt_token"
  
  - *200 ok* on success
  - *401 Unauthorized* on invalid credentials

### Get Authenticated User Info
#### GET /api/userinfo
Returns information about the logged-in user.
Requires JWT token in Authorization header.
