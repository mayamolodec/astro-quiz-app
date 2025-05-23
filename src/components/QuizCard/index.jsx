import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom"

import { useGetQuestionsQuery } from "../../store/quizApi";

import styles from "./QuizCard.module.scss";

export default function QuizCard() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentScore, setCurrentScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [selected, setSelected] = useState(null);
    const { data, isLoading, error } = useGetQuestionsQuery(id);

    if (isLoading) return <p>Loading quizzes...</p>;
    if (error) return <p>Error loading quiz</p>;
    if (!data) return <p>No data found</p>;

    const placeHolderImg = "https://apod.nasa.gov/apod/image/2412/MarsClouds_Perseverance_2048.jpg";

    const questions = data.questions;

    function listAnswers(currentQuestion) {
        return currentQuestion.answers.map(answer => (
            <label className={styles["container__card-text-options-element"]} key={`${answer._id}_label`}>
                <input key={answer._id} type="radio" value={answer.isCorrect} name="answer" onChange={() => setSelected(answer.isCorrect)} />
                {answer.text}
            </label>
        ))
    }

    function showQuestion() {
        const currentQuestion = questions[currentQuestionIndex];

        console.log(currentQuestion);

        return (
            <>
                <div className={styles["container"]}>
                    <form className={styles["container__card"]} onSubmit={onSubmit}>
                        <img className={styles["container__card-img"]} src={placeHolderImg} />
                        <div className={styles["container__card-text"]}>
                            <h2 className={styles["container__card-text-question"]}>
                                {currentQuestion.text}
                            </h2>
                            <div className={styles["container__card-text-options"]}>{listAnswers(currentQuestion)}</div>
                        </div>
                        <button className={styles["container__card-button"]} disabled={selected === null}>
                            Submit
                        </button>
                    </form>
                </div>
            </>
        )

    }

    function showResults() {
        console.log("results", currentScore);
        let result = `Your result is ${currentScore}/${questions.length}`
        let message = currentScore === 4
            ? "Excellent! You're a quiz master!🌠"
            : currentScore >= 2
                ? "Good job! But you can do better!😺"
                : "Keep trying! Practice makes perfect. 🚀";

        return (
            <>
                <div className={styles["container"]}>
                    <form className={styles["container__card"]} onSubmit={onSubmit}>
                        <img className={styles["container__card-img"]} src={placeHolderImg} />
                        <div className={styles["container__card-text"]}>
                            <h2 className={styles["container__card-text-result"]}>{result}</h2>
                            <h3 className={styles["container__card-text-message"]}>
                                {message}
                            </h3>
                        </div>
                        <button className={styles["container__card-button"]} type="button" onClick={() => navigate("/quizes")}>
                            To the quizzes list
                        </button>
                    </form>
                </div>
            </>
        )

    }

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const selectedValue = formData.get("answer");

        console.log("Is the answer correct?", selectedValue);

        if (selectedValue == "true") {
            setCurrentScore(score => score + 1);
            console.log("Currentscore", currentScore);
        }
        console.log("currQuestion", currentQuestionIndex);

        if (questions[currentQuestionIndex + 1]) {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelected(null);
        }
        else {
            setIsFinished(true);
        }
    }

    return isFinished ? showResults() : showQuestion();

}
