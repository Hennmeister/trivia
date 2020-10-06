import React, { Component } from 'react'
import classes from './gamemodes.module.css'
import axios from '../../axios/axios-questions'
import AnswerControls from '../trivia/AnswerControls'
import GameStats from '../trivia/GameStats'
import Timer from './Timer'
import Spinner from '../UI/Spinner'

import { RequiredGameState, RequiredGameProps, Question } from '../../model'
import { makeQuestionRequest, getSessionToken } from '../../gameUtils'
import AnswerIndicator from '../UI/AnswerIndicator'

interface Props extends RequiredGameProps {
  endGame: (score: number, questions: Question[], answers: string[]) => void
}

interface State extends RequiredGameState {}

class TimeRace extends Component<Props, State> {
  state = {
    questions: [] as Question[],
    questionIndex: 0,
    score: 0,
    questionsRequested: false,
    userAnswers: [],
    token: '',
    showIndicator: false,
  }

  componentDidMount() {
    this._getSessionToken()
    this._getQuestions()
  }

  _onSubmitAnswerHandler = (isCorrect: boolean, answer: string) => {
    if (isCorrect) {
      this.setState((prevProps) => {
        this.setState({
          score: prevProps.score + 1,
          questionIndex: prevProps.questionIndex + 1,
          userAnswers: prevProps.userAnswers.concat(answer),
        })
      })
    } else {
      this.setState((prevProps) => {
        this.setState({
          questionIndex: prevProps.questionIndex + 1,
          userAnswers: prevProps.userAnswers.concat(answer),
        })
      })
    }
    this._getQuestions()
    this.setState({ showIndicator: true })
    setTimeout(() => {
      this.setState({ showIndicator: false })
    }, 1000)
  }

  _onSkipHandler = (answer: string) => {
    this.setState((prevProps) => {
      this.setState({ questionIndex: prevProps.questionIndex + 1, userAnswers: prevProps.userAnswers.concat(' ') })
    })
    this._getQuestions()
  }

  _getQuestions = () => {
    if (!this.state.questionsRequested && this.state.questionIndex > this.state.questions.length - 5) {
      this.setState({ questionsRequested: true })
      makeQuestionRequest(this.props.categoryId, this.state.token)
        .then((newQuestions) => {
          let copy: Question[] = [...this.state.questions]
          copy = copy.concat(newQuestions as Question[])
          this.setState({ questions: copy, questionsRequested: false })
        })
        .catch((err) => console.log(err))
    }
  }

  _getSessionToken = async () => {
    getSessionToken().then((token) => {
      this.setState({ token: token })
    })
  }

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
        </>
      )
    if (this.state.showIndicator) {
      game = (
        <div className={classes.wrapper}>
          <AnswerIndicator
            isCorrect={
              this.state.userAnswers[this.state.questionIndex - 1] ===
              this.state.questions.slice()[this.state.questionIndex - 1].answers.filter((ans) => ans.isCorrect)[0]
                .answer
            }
          />
        </div>
      )
    }
    return (
      <>
        {game}
        <Timer
          onTimerEnd={() =>
            this.props.endGame(
              this.state.score,
              this.state.questions.slice(0, this.state.questionIndex),
              this.state.userAnswers
            )
          }
        ></Timer>
      </>
    )
  }
}

export default TimeRace
