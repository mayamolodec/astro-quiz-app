import * as React from "react"

import { useGetQuizzesQuery } from "../../store/quizApi";
import QuizButton from "../QuizButton";

import styles from "./ListQuizzes.module.scss"

export default function ListQuizzes() {

  const { data, isLoading, error } = useGetQuizzesQuery();

  console.log(data);
  if (isLoading) return <p>Loading quizzes...</p>;
  if (error) return <p>Error loading quizzes</p>;
  if (!data) return <p>No data found</p>;

  let score = "1/4"

  const listQuizes = data.map(state => {
  let quizStatus = "Start";
    // let quizStatus = (questions === null) ? "Start" : "Restart";

    return (
      <QuizButton name={state.name} status={quizStatus} score={score} key={state.id} id={state.id} />
    );
  });

  return <div className={styles.container}>{listQuizes}</div>
}
