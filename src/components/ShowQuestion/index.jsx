import React from "react";

import styles from "../QuizCard/QuizCard.module.scss";

function listAnswers(answers, setSelected) {
    return answers.map(answer => (
        <label className={styles["container__card-text-options-element"]} key={`${answer._id}_label`}>
            <input key={answer._id} type="radio" value={answer.isCorrect} name="answer" onChange={() => setSelected(answer.isCorrect)} />
            {answer.text}
        </label>
    ))
}

export default function ShowQuestion({ currentQuestion, onSubmit, placeHolderImg, selected, setSelected }) {

    return (
        <>
            <div className={styles["container"]}>
                <form className={styles["container__card"]} onSubmit={onSubmit}>
                    <img className={styles["container__card-img"]} src={placeHolderImg} />
                    <div className={styles["container__card-text"]}>
                        <h2 className={styles["container__card-text-question"]}>
                            {currentQuestion.text}
                        </h2>
                        <div className={styles["container__card-text-options"]}>{listAnswers(currentQuestion.answers, setSelected)}</div>
                    </div>
                    <button className={styles["container__card-button"]} disabled={selected === "not_selected"}>
                        Submit
                    </button>
                </form>
            </div>
        </>
    )

}
