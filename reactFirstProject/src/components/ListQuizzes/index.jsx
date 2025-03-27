// import { useState } from 'react'
import QuizButton from "../QuizButton";
import styles from "./ListQuizzes.module.scss"
import { useGetQuizzesQuery } from "../../store/quizApi";
import * as React from 'react'

export default function ListQuizzes(){
    // const states = useSelector(state => state.quizzes.quizzes);
    // const {status, error} = useSelector(state => state.quizzes);

    const {  data, isLoading, error } = useGetQuizzesQuery();

    if (isLoading) return <p>Loading quizzes...</p>;
    if (error) return <p>Error loading quizzes</p>;
    if (!data) return <p>No data found</p>;

    let score = "1/4"
    let questions = 4;

    const listQuizes = data.map(state => {
      
      let quizStatus = (questions === null) ? "Start" : "Restart";

      // For later, when there'll be a score
      //
      // let quizStatus = (state.questions === null) ? "Start" : "Restart";
      // let score = (state.questions === null) ? "" : state.score+"/"+state.questions;

        return(
            <>
            <QuizButton name = {state.name} status = {quizStatus}  score={score} key={state.id}/>
            </>
          );
        });

  
    return <div className={styles.container}>{listQuizes}</div>
    }