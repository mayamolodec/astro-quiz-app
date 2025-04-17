import React from "react";
import { useParams } from "react-router-dom"

import styles from "./QuizCard.module.scss";

export default function QuizCard() {
    const { id } = useParams();
    const placeHolderImg = "https://apod.nasa.gov/apod/image/2412/MarsClouds_Perseverance_2048.jpg";

    return (
        <>
            <div className={styles["container"]}>
                <form className={styles["container__card"]}>
                    <img className={styles["container__card-img"]} src={placeHolderImg} />
                    <div className={styles["container__card-text"]}>
                        <h2 className={styles["container__card-text-question"]}>
                            % QuestionText %
                        </h2>
                        <div className={styles["container__card-text-options"]}>
                            <label className={styles["container__card-text-options-element"]}>
                                <input type="radio" value="option1" name="answer" />
                                % opt1 %
                            </label>
                            <label className={styles["container__card-text-options-element"]}>
                                <input type="radio" value="option2" name="answer" />
                                % opt2 %
                            </label>
                            <label className={styles["container__card-text-options-element"]}>
                                <input type="radio" value="option3" name="answer" />
                                % opt3 %
                            </label>
                            <label className={styles["container__card-text-options-element"]}>
                                <input type="radio" value="option4" name="answer" />
                                % opt4 %
                            </label>
                        </div>
                    </div>
                    <button className={styles["container__card-button"]}>
                        % Submit %
                    </button>
                </form>
            </div>
            <p style={{ color: "grey" }}>Quiz number {id}</p>
        </>

    )

}
