# RBAC Blog Platform

A Role-Based Access Control (RBAC) blog platform built using **Node.js**, **Express**, **MongoDB**, and **React**.

## Features

- **User Authentication** with JWT.
- **Role-based Authorization** (Admin/User).
- **CRUD Operations** for blogs.
- **Admin Dashboard** to manage posts.

## Tech Stack

- **Frontend**: React, Axios
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT

## Setup Instructions

### Prerequisites
Make sure you have the following installed:
- Node.js
- MongoDB or a cloud MongoDB instance (like MongoDB Atlas)

### Backend Setup

Clone the repo:
   git clone https://github.com/vardhans-github/rbac-blog-platform.git

Go to the backend directory:
cd rbac-blog-platform/backend

Install dependencies:
npm install

Create a .env file in the backend folder with the following variables:
JWT_SECRET=<Your secret key>
MONGO_URI=<Your MongoDB URI>
Run the backend:
npm start


### Frontend Setup

Go to the frontend directory:
cd rbac-blog-platform/frontend

Install dependencies:
npm install

Run the frontend:
npm start

The application will run on http://localhost:3000 and the backend on http://localhost:5000.

### Usage
Sign Up: Create a new account.

Login: Log in with your credentials.

Admin: Only admins can create, update, or delete blog posts.