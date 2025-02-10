let states = [
  {
    id:0,
    name: "Quiz #1",
    questions:5,
    score:null,

  },
  {
    id:1,
    name: "Quiz #2",
    questions:5,
    score:2
  },
  {
    id:2,
    name: "Quiz #3",
    questions: 4,
    score:3
  }
]

function QuizButton({name, status, score}){
  return (
    <button onClick = {(e)=>alert(e.target.value)} key = {name} value = {name}>
      <div>{name}:  <span style = {{color:"#9F50B1"}}>{status}</span></div>
      <div>{score}</div>
    </button>
  )
}

function ListQuizes(){
  console.log(states);
  const listQuizes = states.map(state => {
    let status = (state.score === null) ? "Start" : "Restart";
    let score = (state.score === null) ? "" : state.score+"/"+state.questions;

    return(
      <QuizButton name = {state.name} status = {status}  score={score}/>
    );
  });

  return <div className='listQuizesContainer'>{listQuizes}</div>
  }

function App() {
  return (
    <>
    <h1>AstroQuiz</h1>
    <ListQuizes/>
    </>
  )
}

export default App
