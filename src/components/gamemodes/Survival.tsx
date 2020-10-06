import React, { Component } from 'react'
import classes from './gamemodes.module.css'
import AnswerControls from '../trivia/AnswerControls'
import GameStats from '../trivia/GameStats'
import Lives from './Lives'

import { RequiredGameState, RequiredGameProps, Question } from '../../model'
import { makeQuestionRequest, getSessionToken } from '../../gameUtils'
import Spinner from '../UI/Spinner'
import AnswerIndicator from '../UI/AnswerIndicator'

interface Props extends RequiredGameProps {
  endGame: (score: number, questions: Question[], answers: string[]) => void
}

interface State extends RequiredGameState {
  remainingSkips: number
  lives: number
  questions: Question[]
}

class Survival extends Component<Props, State> {
  state = {
    questions: [] as Question[],
    questionIndex: 0,
    score: 0,
    questionsRequested: false,
    remainingSkips: 3,
    lives: 3,
    userAnswers: [],
    token: '',
    showIndicator: false,
  }

  componentDidMount() {
    this._getSessionToken()
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
        this.setState(
          {
            lives: prevProps.lives - 1,
            questionIndex: prevProps.questionIndex + 1,
            userAnswers: prevProps.userAnswers.concat(answer),
          },
          () => {
            if (this.state.lives === 0) {
              this.props.endGame(
                this.state.score,
                this.state.questions.slice(0, this.state.questionIndex),
                this.state.userAnswers
              )
            }
          }
        )
      })
    }
    this._getQuestions()
    this.setState({ showIndicator: true })
    setTimeout(() => {
      this.setState({ showIndicator: false })
    }, 1000)
  }

  _onSkipHandler = (answer: string) => {
    if (this.state.remainingSkips > 0) {
      this.setState((prevProps) => {
        this.setState({
          questionIndex: prevProps.questionIndex + 1,
          remainingSkips: prevProps.remainingSkips - 1,
          userAnswers: prevProps.userAnswers.concat(''),
        })
      })
    }
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

  _getSessionToken = () => {
    getSessionToken().then((token) => {
      this.setState({ token: token }, this._getQuestions)
    })
  }

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
    return game
  }
}

export default Survival
