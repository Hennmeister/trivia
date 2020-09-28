import React, { Component } from 'react'
import classes from './gamemodes.module.css'
import axios from '../../axios/axios-questions'
import AnswerControls from '../trivia/AnswerControls'
import GameStats from '../trivia/GameStats'
import Timer from './Timer'
import Spinner from '../UI/Spinner'

import { RequiredGameState, RequiredGameProps, Question } from '../../model'
import { makeQuestionRequest } from '../../gameUtils'

interface Props extends RequiredGameProps {}

interface State extends RequiredGameState {}

class TimeRace extends Component<Props, State> {
  state = {
    questions: [] as Question[],
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

  _getQuestions = () => {
    if (!this.state.questionsRequested && this.state.questionIndex > this.state.questions.length - 5) {
      this.setState({ questionsRequested: true })
      makeQuestionRequest(this.props.categoryId).then(([newQuestions, resp_code]) => {
        let copy: Question[] = [...this.state.questions]
        copy = copy.concat(newQuestions as Question[])
        this.setState({ questions: copy, questionsRequested: false })
      })
    }
  }

  _EndGame = () => {}

  render() {
    let game =
      this.state.questionIndex === this.state.questions.length ? (
        <Spinner />
      ) : (
        <>
          <GameStats toHideSkips={true} score={this.state.score} />
          <div className={classes.wrapper}>
            <text className={classes.question}>{this.state.questions[this.state.questionIndex].question}</text>
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
    return game
  }
}

export default TimeRace
