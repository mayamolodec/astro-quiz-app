import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"

import { useGetQuestionsQuery } from "../../store/quizApi";
import ShowQuestion from "../ShowQuestion/index";
import ShowResults from "../ShowResults/index";

export default function QuizCard() {
    const { id } = useParams();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentScore, setCurrentScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [selected, setSelected] = useState("not_selected");
    const { data, isLoading, error } = useGetQuestionsQuery(id);
    const navigate = useNavigate();

    if (isLoading) return <p>Loading quizzes...</p>;
    if (error) return <p>Error loading quiz</p>;
    if (!data) return <p>No data found</p>;

    const questions = data.questions;

    const submitAnswer = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const selectedValue = formData.get("answer");

        if (selectedValue == "true") {
            setCurrentScore(score => score + 1);
        }

        if (questions[currentQuestionIndex + 1]) {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelected("not_selected");
        }
        else {
            setIsFinished(true);
        }
    }

    const submitResults = (e) => {
        e.preventDefault();
        navigate("/quiz");
    }

    return isFinished ?
        <ShowResults currentScore={currentScore} numberOfQuestions={questions.length} onSubmit={submitResults}
            placeHolderImg={"/Placeholder.png"} /> :
        <ShowQuestion currentQuestion={questions[currentQuestionIndex]} onSubmit={submitAnswer}
            placeHolderImg={"/Placeholder.png"} selected={selected} setSelected={setSelected} />;
}
