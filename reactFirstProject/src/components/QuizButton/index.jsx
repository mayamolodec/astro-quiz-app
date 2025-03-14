import styles from './QuizButton.module.scss';

export default function QuizButton({name, status, score}){
  console.log(styles)
    return (
      <button className={styles.container} onClick = {(e)=>alert(e.target.value)} key = {name} value = {name}>
        <div>{name}:  <span style = {{color:"#9F50B1"}}>{status}</span></div>
        <div>{score}</div>

      </button> 
    )
  }