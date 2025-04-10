import styles from './QuizButton.module.scss';
import * as React from 'react'

export default function QuizButton({name, status, score}){
    return (
      <button className={styles.container} onClick = {(e)=>alert(e.target.value)} key = {name} value = {name}>
        <div>{name}:  <span style = {{color:"#9F50B1"}}>{status}</span></div>
        <div>{score}</div>

      </button> 
    )
  }