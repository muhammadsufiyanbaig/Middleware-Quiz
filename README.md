# Quiz Application

## Overview

This project is a full-stack Quiz Application developed using React.js and Tailwind CSS for the frontend, and Express.js with SQLite for the backend. Middleware is employed for authorization to ensure secure access to the application.

## Features

- **User Authentication:** Secure login and registration.
- **Quiz Management:** Create, read, update, and delete quizzes.
- **User Authorization:** Middleware to manage user permissions.
- **Responsive Design:** Built with Tailwind CSS to ensure the application is mobile-friendly.
- **Persistent Data:** Uses SQLite for storing quiz data.

## Tech Stack

### Frontend
- **React.js:** A JavaScript library for building user interfaces.
- **Tailwind CSS:** A utility-first CSS framework for rapid UI development.

### Backend
- **Express.js:** A web application framework for Node.js.
- **SQLite:** A lightweight, disk-based database.
- **Middleware:** Used for handling authorization.

## Getting Started

### Prerequisites

- Node.js
- npm (Node Package Manager)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/muhammadsufiyanbaig/Middleware-Quiz
   cd quiz-application
   ```

2. **Install frontend dependencies:**
   ```bash
   cd frontend
   npm install
   ```

3. **Install backend dependencies:**
   ```bash
   cd ../backend
   npm install
   ```

### Environment Variables

Create a `.env` file in the `backend` directory and add the following:

```plaintext
PORT=5000
JWT_SECRET=your_jwt_secret
```

### Running the Application

1. **Start the backend server:**
   ```bash
   cd backend
   npm start
   ```

2. **Start the frontend server:**
   ```bash
   cd ../frontend
   npm start
   ```

## License

This project is licensed under the MIT License. See the `LICENSE` file for more information.

## Acknowledgements

- [React.js](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Express.js](https://expressjs.com/)
- [SQLite](https://www.sqlite.org/)

---

For any questions or further assistance, please contact [Muhammad Sufiyan Baig](https://muhammadsufiyanbaig.vercel.app/) at send.sufiyan@gmail.com. Happy codding!
