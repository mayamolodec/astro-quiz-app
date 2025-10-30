import React from "react";

import styles from "../QuizCard/QuizCard.module.scss";

function listAnswers(options, correct, setSelected, selected) {
    return options.map((option, index) => (
        <label className={styles["container__card-text-options-element"]} key={`${index}_label`}>
            <input key={index} type="radio" value={!!(index == correct)} name="answer" checked={selected === index} onChange={() => setSelected(index)} />
            {option}
        </label>
    ))
}

export default function ShowQuestion({ currentQuestion, onSubmit, placeHolderImg, selected, setSelected }) {

    return (
        <>
            <div className={styles["container"]}>
                <form className={styles["container__card"]} onSubmit={onSubmit}>
                    <img className={styles["container__card-img"]} src={currentQuestion.img_url || placeHolderImg} />
                    <div className={styles["container__card-text"]}>
                        <h2 className={styles["container__card-text-question"]}>
                            {currentQuestion.text}
                        </h2>
                        <div className={styles["container__card-text-options"]}>{listAnswers(currentQuestion.options, currentQuestion.correct, setSelected, selected)}</div>
                    </div>
                    <button className={styles["container__card-button"]} disabled={selected === null}>
                        Submit
                    </button>
                </form>
            </div>
        </>
    )

}
