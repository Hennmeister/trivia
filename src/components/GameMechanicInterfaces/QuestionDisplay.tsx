import React, { Component } from 'react'
import classes from './gameMechanicInterfaces.module.css'

interface Props {
  question: string
  userAnswer: string
  correctAnswer: string
}
interface State {}

export default class QuestionDisplay extends Component<Props, State> {
  state = {}

  render() {
    return (
      <div className={classes.question}>
        <text className={classes.questionTxt}>
          Question: {'\n'} {this.props.question}
        </text>
        <text
          className={classes.ans}
          style={
            this.props.userAnswer === this.props.correctAnswer
              ? { color: 'green', opacity: 0.6 }
              : { color: 'red', opacity: 0.6 }
          }
        >
          Answer: {this.props.correctAnswer}
        </text>
      </div>
    )
  }
}
