import React from "react";
import { useNavigate } from "react-router-dom";

import styles from "./QuizButton.module.scss";

export default function QuizButton({ name, status, score, id }) {

  const navigate = useNavigate();

  return (
    <button className={styles.container} onClick={() => navigate(`/quiz/${id}`)} key={name} value={name}>
      <div>{name}:  <span style={{ color: "#9F50B1" }}>{status}</span></div>
      <div>{score}</div>
    </button>
  )
}
