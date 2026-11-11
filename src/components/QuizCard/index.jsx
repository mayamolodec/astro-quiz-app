import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"

import { useGetQuestionsQuery } from "../../store/quizApi";
import { saveQuizResult } from "../../utils/quizStorage";
import ShowQuestion from "../ShowQuestion/index";
import ShowResults from "../ShowResults/index";

export default function QuizCard() {
    const { id } = useParams();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentScore, setCurrentScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [selected, setSelected] = useState(null);
    const { data, isLoading, error } = useGetQuestionsQuery(id);
    const navigate = useNavigate();
    const resultsImg = "/placeholder.webp";

    useEffect(() => {
        if (!data) return;

        const nextQuestion = data[currentQuestionIndex + 1];

        if (!nextQuestion?.img_url) return;
        const image = new Image();

        image.src = nextQuestion.img_url;
    }, [data, currentQuestionIndex]);

    useEffect(() => {
        const image = new Image();

        image.src = resultsImg;
    }, [resultsImg]);

    if (isLoading) return <p>Loading quizzes...</p>;
    if (error) return <p>Error loading quiz</p>;
    if (!data) return <p>No data found</p>;

    const placeHolderImg = "/placeholder.webp";

    const questions = data;

    const submitAnswer = async(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const selectedValue = formData.get("answer");

        const newScore = currentScore + (selectedValue === "true" ? 1 : 0);

        setCurrentScore(newScore);

        if (questions[currentQuestionIndex + 1]) {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelected(null);
        }
        else {

            try {
                saveQuizResult(id, newScore, questions.length);
              } catch (err) {
                console.error("Failed to save quiz result:", err);
              }

            setIsFinished(true);
        }
    }

    const submitResults = async(e) => {
        e.preventDefault();
        navigate("/quiz");
    }

    const navigateToProfile = () => {
        navigate("/profile");
    };

    return isFinished ?
        <ShowResults currentScore={currentScore} numberOfQuestions={questions.length} onSubmit={submitResults}
        onViewProfile={navigateToProfile} placeHolderImg={resultsImg} /> :
        <ShowQuestion currentQuestion={questions[currentQuestionIndex]} onSubmit={submitAnswer}
            placeHolderImg={placeHolderImg} selected={selected} setSelected={setSelected} />;
}
