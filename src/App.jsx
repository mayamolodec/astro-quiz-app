import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";

import Header from "./components/Header";
import ListQuizzes from "./components/ListQuizzes";
import Profile from "./components/Profile";
import QuizCard from "./components/QuizCard";

function App() {
  return (
    <>
      <Header />
      <main className={"main-content"}>
        <Routes>
          <Route path="/quiz" element={<ListQuizzes />} />
          <Route path="/quiz/:id" element={<QuizCard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Navigate to="/quiz" replace />} />
          <Route path="*" element={<Navigate to="/quiz" replace />} />
        </Routes>
      </main>
    </>
  )
}

export default App
