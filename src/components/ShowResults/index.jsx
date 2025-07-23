import React from "react";

import styles from "../QuizCard/QuizCard.module.scss";

export default function ShowResults({ currentScore, numberOfQuestions, onSubmit, placeHolderImg }) {

    let result = `Your result is ${currentScore}/${numberOfQuestions}`;
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
                    <button className={styles["container__card-button"]}>
                        To the quizzes list
                    </button>
                </form>
            </div>
        </>
    )
}
