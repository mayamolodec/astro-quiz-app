import { useSelector } from "react-redux";
import QuizButton from "../QuizButton";

export default function ListQuizzes(){
    const states = useSelector(state => state.quizzes.quizzes);
    const listQuizes = states.map(state => {
      let status = (state.score === null) ? "Start" : "Restart";
      let score = (state.score === null) ? "" : state.score+"/"+state.questions;
  
      return(
        <QuizButton name = {state.name} status = {status}  score={score}/>
      );
    });
  
    return <div className='listQuizesContainer'>{listQuizes}</div>
    }