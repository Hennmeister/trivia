import React, { Component } from 'react'
import classes from './gamemodes.module.css'
import axios from '../../axios/axios-questions'
import AnswerControls from '../trivia/AnswerControls'
import GameStats from '../trivia/GameStats'
import Timer from './Timer'

import { RequiredGameState, RequiredGameProps, Question } from '../../model'
import { makeQuestionRequest } from '../../gameUtils'

interface Props extends RequiredGameProps {}

interface State extends RequiredGameState {}

class TimeRace extends Component<Props, State> {
  state = {
    questions: [],
    questionIndex: 0,
    score: 0,
    questionsRequested: false,
  }

  componentDidMount() {
    this._getQuestions()
  }

  _onSubmitAnswerHandler = (isCorrect: boolean) => {
    if (isCorrect) {
      this.setState((prevProps) => {
        this.setState({ score: prevProps.score + 1, questionIndex: prevProps.questionIndex + 1 })
      })
    }
    this._getQuestions()
  }

  _onSkipHandler = () => {
    this.setState((prevProps) => {
      this.setState({ questionIndex: prevProps.questionIndex + 1 })
    })
    this._getQuestions()
  }

  _getQuestions = async () => {
    if (!this.state.questionsRequested && this.state.questionIndex > this.state.questions.length - 5) {
      this.setState({ questionsRequested: true })
      makeQuestionRequest(this.props.categoryId).then(([newQuestions, resp_code]) => {
        console.log(resp_code)
        this.setState((prevProps) => {
          this.setState({
            questions: prevProps.questions.concat(newQuestions as Question[]),
            questionsRequested: false,
          })
        })
      })
    }
  }

  _EndGame = () => {}

  render() {
    return (
      <>
        <GameStats toHideSkips={true} score={this.state.score} />
        <div className={classes.wrapper}>
          <text className={classes.question}>{this.state.questions[this.state.questionIndex]}</text>
          <AnswerControls
            question={this.state.questions[this.state.questionIndex]}
            onSkipHandler={this._onSkipHandler}
            onSubmitHandler={this._onSubmitAnswerHandler}
            isSkipDisabled={false}
          />
        </div>
        <Timer onTimerEnd={this._EndGame}></Timer>
      </>
    )
  }
}

export default TimeRace
