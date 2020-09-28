import React, { Component } from 'react'
import classes from './gameMechanicInterfaces.module.css'

interface Props {
  question: string
  userAnswer: string
  correctAnswer: string
}
interface State {}

export default class Question extends Component<Props, State> {
  state = {}

  render() {
    return (
      <div className={classes.question}>
        <text>Question: {this.props.question}</text>
        <text style={this.props.userAnswer === this.props.correctAnswer ? undefined : { color: 'red' }}>
          Answer: {this.props.correctAnswer}
        </text>
      </div>
    )
  }
}
