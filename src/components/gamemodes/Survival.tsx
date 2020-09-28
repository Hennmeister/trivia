import React, { Component } from 'react'
import classes from './gamemodes.module.css'
import AnswerControls from '../trivia/AnswerControls'
import GameStats from '../trivia/GameStats'
import Lives from './Lives'

import { RequiredGameState, RequiredGameProps, Question } from '../../model'
import { makeQuestionRequest } from '../../gameUtils'
import Spinner from '../UI/Spinner'

interface Props extends RequiredGameProps {}

interface State extends RequiredGameState {
  remainingSkips: number
  lives: number
  questions: Question[]
}

//TODO: Endgame by passing up releveant props, making endscreen comp that gamemanager shows
// refactor api call
// high score feautre - enter name  (maybe use cloud fun)

class Survival extends Component<Props, State> {
  state = {
    questions: [] as Question[],
    questionIndex: 0,
    score: 0,
    questionsRequested: false,
    remainingSkips: 3,
    lives: 3,
  }

  componentDidMount() {
    this._getQuestions()
  }

  _onSubmitAnswerHandler = (isCorrect: boolean) => {
    if (isCorrect) {
      this.setState((prevProps) => {
        this.setState({ score: prevProps.score + 1, questionIndex: prevProps.questionIndex + 1 })
      })
    } else {
      this.setState((prevProps) => {
        this.setState({ lives: prevProps.lives - 1, questionIndex: prevProps.questionIndex + 1 })
      })
      if (this.state.lives <= 0) {
        this._endGame()
      }
    }
    this._getQuestions()
  }

  _onSkipHandler = () => {
    if (this.state.remainingSkips > 0) {
      this.setState((prevProps) => {
        this.setState({ questionIndex: prevProps.questionIndex + 1, remainingSkips: prevProps.remainingSkips - 1 })
      })
    }
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

  _endGame = () => {}

  render() {
    let game =
      this.state.questionIndex === this.state.questions.length ? (
        <Spinner />
      ) : (
        <>
          <GameStats remainingSkips={this.state.remainingSkips} score={this.state.score} />
          <div className={classes.wrapper}>
            <text className={classes.question}>{this.state.questions[this.state.questionIndex].question}</text>
            <AnswerControls
              question={this.state.questions[this.state.questionIndex]}
              onSkipHandler={this._onSkipHandler}
              onSubmitHandler={this._onSubmitAnswerHandler}
              isSkipDisabled={this.state.remainingSkips === 0}
            />
          </div>
          <Lives lives={this.state.lives}></Lives>
        </>
      )
    return game
  }
}

export default Survival
