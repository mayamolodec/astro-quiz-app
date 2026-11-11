import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useGetQuizzesQuery } from "../../store/quizApi";
import { getGuestName, generateNewGuestName } from "../../utils/guestName";
import {getAllQuizResults, clearAllQuizResults} from "../../utils/quizStorage";

import styles from "./Profile.module.scss";

export default function Profile() {
    const { data:quizzes, isLoading, error } = useGetQuizzesQuery();
    const navigate = useNavigate();
    const [results, setResults] = useState(getAllQuizResults);
    const [guestName, setGuestName] = useState(getGuestName);

    const handleChangeName = () => {
      const newName = generateNewGuestName();

      setGuestName(newName);
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading quizzes</p>;

  const stats = (quizzes ?? [])
    .filter((quiz) => results[String(quiz.id)])
    .map((quiz) => ({
      id: quiz.id,
      name: quiz.name,
      ...results[String(quiz.id)],
    }));

    const handleClearResults = () => {
        const confirmed = window.confirm(
          "Delete all your saved quiz results?"
        );

        if (!confirmed) return;

        clearAllQuizResults();
        setResults({});
      };

    const navigateToQuizzes = () => {
        navigate("/quiz");
    };

    const listResults = stats.map((stat) => {
        return (
            <div  key = {stat.name}>
                <span style={{ color: "#9F50B1" }}>{stat.name}:</span><br></br>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                <span>{stat.tries ?? 1}{" "}{(stat.tries ?? 1) === 1 ? "try" : "tries"}</span>
                <span> {stat.score}/{stat.total} points</span>
                </div>
            </div>

        );
      });

    return (
        <div className={styles["container"]}>
            <div className={styles["container__card"]}>
                <div className={styles["container__guest-name"]}>
                <p> <span style={{ color: "#9F50B1" }}>Guest:</span> {guestName}</p>
                <button type="button" className={styles["container__change-name-button"]} onClick={handleChangeName}
                    aria-label="Generate a new guest name" title="Generate a new name">↻</button>
                </div>
                <p>{stats.length > 0 ? listResults : "No results yet"}</p>
                <button className={styles["container__clear-button"]} onClick={handleClearResults}>Clear results</button>
            </div>
            <button className={styles["container__button"]} onClick={navigateToQuizzes}>
                Back to quiz list
            </button>
        </div>
    )
}
