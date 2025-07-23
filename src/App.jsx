import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";

import EnterForm from "./components/EnterForm";
// import Header from "./components/Header";
import ListQuizzes from "./components/ListQuizzes";
import QuizCard from "./components/QuizCard";
import RegisterForm from "./components/RegisterForm";
import PrivateRoute from "./utils/auth";

function App() {
  return (
    <>
      <Routes>
        <Route path="/quiz" element={<PrivateRoute><ListQuizzes /></PrivateRoute>} />
        <Route path="/sign-up" element={< RegisterForm />} />
        <Route path="/sign-in" element={<EnterForm />} />
        <Route path="/quiz/:id" element={<QuizCard />} />
        <Route path="/" element={<Navigate to="/quiz" replace />} />
        <Route path="*" element={<Navigate to="/quiz" replace />} />
      </Routes>
    </>
  )
}

export default App
