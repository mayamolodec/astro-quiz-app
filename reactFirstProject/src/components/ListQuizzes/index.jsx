import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react'
import QuizButton from "../QuizButton";
import styles from "./ListQuizzes.module.scss"
import { fetchQuizes } from "../../store/quizSlice";


export default function ListQuizzes(){
    const states = useSelector(state => state.quizzes.quizzes);
    const {status, error} = useSelector(state => state.quizzes);
  
    const dispatch = useDispatch();
    useEffect(()=>{
      dispatch(fetchQuizes())
    },[])

    const listQuizes = states.map(state => {
      
      let quizStatus = (state.questions === null) ? "Start" : "Restart";
      let score = (state.questions === null) ? "" : state.questions+"/"+state.questions;
        if (status == 'resolved'){
          return(
            <QuizButton name = {state.name} status = {quizStatus}  score={score} key={state.id}/>
          );
        }
        else if (status == 'loading'){
          return(
            <h2>Loading...</h2>
          )
        }
        else if (status == 'rejected'){
          return(
            <h2>Error!</h2>
          )
        }

    });
  
    return <div className={styles.container}>{listQuizes}</div>
    }