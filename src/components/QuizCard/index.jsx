import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"

import { useAddResultMutation } from "../../store/quizApi";
import { useGetQuestionsQuery } from "../../store/quizApi";
import { supabase } from "../../supabaseClient";
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
    const [addResult] = useAddResultMutation();

    if (isLoading) return <p>Loading quizzes...</p>;
    if (error) return <p>Error loading quiz</p>;
    if (!data) return <p>No data found</p>;

    const placeHolderImg = "https://jmwdqvycbnpbjivfzukh.supabase.co/storage/v1/object/public/Quiz_images/placeholder.webp";

    const questions = data;

    const submitAnswer = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const selectedValue = formData.get("answer");

        if (selectedValue === "true") {
            setCurrentScore(score => score + 1);
        }

        if (questions[currentQuestionIndex + 1]) {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelected(null);
        }
        else {
            setIsFinished(true);
        }
    }

    const submitResults = async(e) => {
        e.preventDefault();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) return;

        try{
            await addResult({
                user_id: user.id,
                quiz_id: id,
                result: currentScore
              })
        }
        catch (err){
            console.error("Unexpected error:", err);
        }
        navigate("/quiz");
    }

    return isFinished ?
        <ShowResults currentScore={currentScore} numberOfQuestions={questions.length} onSubmit={submitResults}
            placeHolderImg={placeHolderImg} /> :
        <ShowQuestion currentQuestion={questions[currentQuestionIndex]} onSubmit={submitAnswer}
            placeHolderImg={placeHolderImg} selected={selected} setSelected={setSelected} />;
}
