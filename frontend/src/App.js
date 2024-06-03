import React from "react";
import Quiz from "./components/Quiz";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import Profile from "./components/Profile";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="quiz" element={<Quiz />} />
        <Route path="profile/:id" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default App;
