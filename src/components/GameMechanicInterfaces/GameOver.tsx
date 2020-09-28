import React, { Component } from 'react'
import { Category, Question } from '../../model'
import Title from '../UI/Title'
import classes from './gameMechanicInterfaces.module.css'
import QuestionDisplay from './QuestionDisplay'

interface Props {
  categoryTitle: string
  gamemode: string
  score: number
  questions: Question[]
  answers: string[]
  restart: () => void
}
interface State {}

export default class GameOver extends Component<Props, State> {
  state = {}

  render() {
    let questions = this.props.questions.map((q, i) => {
      let answer = q.answers.filter((ans) => ans.isCorrect)
      return (
        <QuestionDisplay question={q.question} correctAnswer={answer[0].answer} userAnswer={this.props.answers[i]} />
      )
    })
    return (
      <>
        <Title>Trivia!</Title>
        <div className={classes.gameOverModel}>
          <text className={classes.gameOverText}>Game Over</text>
          <text className={classes.score}>Score: {this.props.score}</text>
          <div className={classes.question}></div>
          <text className={classes.gameSettings}>
            Gamemode: {this.props.gamemode} | Category: {this.props.categoryTitle}
          </text>
          <button className={classes.btn + ' ' + classes.restart}>Restart</button>
        </div>
      </>
    )
  }
}
