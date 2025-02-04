import { useState } from 'react'
import ProgressBar from './ProgressBar'
import { quizes } from './data.js';




let states = [

  // Imagine we have a state, where we keep the status of each quiz.
  // For now it's just an array of objects

  {
    quizId:0,
    currentQuestionNumber:0,
    score:0
  },

  {
    quizId:1,
    currentQuestionNumber:3,
    score:2
  },
  {
    quizId:2,
    currentQuestionNumber:4,
    score:3
  }
]


function ListQuizes({quizList}){
  let score = "";

  function openQuiz(e){
    //goToQuiz
  }

  function restart(state){
    score = state.score;
    return (<>Restart</>)
  }
  
  const listQuizes = quizList.map(quiz => 
    <button onClick = {openQuiz} key = {quiz.id} value = {quiz.id}>
      <p>Quiz #{quiz.id}</p>

      <p>{
      (states[quiz.id].currentQuestionNumber == quiz.quiz.length) ? restart(states[quiz.id]): 
      (states[quiz.id].currentQuestionNumber == 0) ? "Start": "Continue"
      }
      </p>

      <ProgressBar totalScore = {score} curQuestionId={states[quiz.id].currentQuestionNumber} questionsLength={quiz.quiz.length}/>
   </button>
    
    );

return(
<div className='listQuizesContainer'>{listQuizes}</div>
)
}

function App() {

  return (
    <>
    <h1>AstroQuiz</h1>
    <ListQuizes quizList={quizes}/>
    </>
  )
}

export default App
