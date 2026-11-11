import React from "react";

import styles from "../QuizCard/QuizCard.module.scss";

export default function ShowResults({ currentScore, numberOfQuestions, onSubmit, onViewProfile, placeHolderImg }) {

    let result = `Your result is ${currentScore}/${numberOfQuestions}`;
    let message = currentScore === numberOfQuestions
        ? "Excellent! You're a quiz master!🌠"
        : currentScore >= 2
            ? "Good job! But you can do better!😺"
            : "Keep trying! Practice makes perfect. 🚀";

    return (
        <>
            <div className={styles["container"]}>
                <form className={styles["container__card"]} onSubmit={onSubmit}>
                    <img className={styles["container__card-img"]} src={placeHolderImg} alt="Astronomy quiz results illustration" />
                    <div className={styles["container__card-text"]}>
                        <h2 className={styles["container__card-text-result"]}>{result}</h2>
                        <h3 className={styles["container__card-text-message"]}>
                        {message}
                        </h3>
                        <button type="button" onClick={onViewProfile} className={styles["container__card-text-button"]}>View all results</button>
                    </div>
                    <button className={styles["container__card-button"]}>
                        Back to quiz list
                    </button>
                </form>
            </div>
        </>
    )
}
