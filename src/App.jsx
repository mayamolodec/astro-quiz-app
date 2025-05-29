import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";

import EnterForm from "./components/EnterForm";
import ListQuizzes from "./components/ListQuizzes";
import QuizCard from "./components/QuizCard";
import RegisterForm from "./components/RegisterForm";

function App() {
  return (
    <>
      <Routes>
        <Route path="/quiz" element={<ListQuizzes />} />
        <Route path="/signup" element={< RegisterForm />} />
        <Route path="/signin" element={<EnterForm />} />
        <Route path="/quiz/:id" element={<QuizCard />} />
        <Route path="/" element={<Navigate to="/quiz" replace />} />
      </Routes>
    </>
  )
}

export default App
