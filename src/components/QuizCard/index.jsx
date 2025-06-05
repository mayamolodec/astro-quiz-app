import React, { useState } from "react";
import { useParams } from "react-router-dom"

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

    if (isLoading) return <p>Loading quizzes...</p>;
    if (error) return <p>Error loading quiz</p>;
    if (!data) return <p>No data found</p>;

    const placeHolderImg = "https://apod.nasa.gov/apod/image/2412/MarsClouds_Perseverance_2048.jpg";

    const questions = data.questions;

    const onSubmit = (e) => {
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

    return isFinished ?
        <ShowResults currentScore={currentScore} numberOfQuestions={questions.length} onSubmit={onSubmit}
            placeHolderImg={placeHolderImg} /> :
        <ShowQuestion currentQuestion={questions[currentQuestionIndex]} onSubmit={onSubmit}
            placeHolderImg={placeHolderImg} selected={selected} setSelected={setSelected} />;

}
