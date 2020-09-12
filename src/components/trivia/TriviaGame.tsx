import React, { Component } from 'react'
import './trivia.css'
import axios from '../../axios-instance'
import Answer from './Answer'
import GameStats from './GameStats'

interface Props {}

interface State {
  question: string
  answer: string
  prevQuestionIds: Set<string>
  score: number
  remainingSkips: number
}

class TriviaGame extends Component<Props, State> {
  state = {
    question: '',
    answer: '',
    prevQuestionIds: new Set<string>(),
    score: 0,
    remainingSkips: 3,
  }

  componentDidMount() {
    this._getRandomQuestion()
  }

  _getRandomQuestion = () => {
    let randIndex = Math.floor(Math.random() * 7868).toString() // Num of entries - retreive this dynamically
    while (this.state.prevQuestionIds.has(randIndex)) {
      randIndex = Math.floor(Math.random() * 7868).toString()
    }
    axios
      .get('/trivia/' + randIndex + '.json')
      .then((response) => {
        this.setState({ question: response.data.question, answer: response.data.answer })
      })
      .catch((error) => {
        console.log('error')
      })
    this.state.prevQuestionIds.add(randIndex)
  }

  _onSubmitAnswerHandler = (answer: string) => {
    if (this._isCorrectAnswer(answer)) {
      this.setState((prevState) => {
        this.setState({ score: prevState.score + 1 })
      })
    }
    this._getRandomQuestion()
  }

  _onSkipHandler = () => {
    if (this.state.remainingSkips > 0) {
      this.setState((prevProps) => {
        this.setState({ remainingSkips: prevProps.remainingSkips - 1 })
      })
      return true
    }
    return false
  }

  _isCorrectAnswer = (answer: string) => {
    let correctAnswer = this.state.answer.slice()
    if (correctAnswer.includes('(') && correctAnswer.charAt(correctAnswer.length - 1) === ')') {
      correctAnswer = correctAnswer.substring(0, correctAnswer.indexOf('('))
    }
    // Normalize capitilization, white space and punctuation
    return (
      answer
        .toUpperCase()
        .replace(/[.,/#!'"$%^&*;:{}=\-_`~()]/g, '')
        .trim() === this.state.answer.replace(/[.,/#!'"$%^&*;:{}=\-_`~()]/g, '').trim()
    )
  }

  _onIncorrectAnswer = () => {}

  render() {
    return (
      <>
        <GameStats remainingSkips={this.state.remainingSkips} score={this.state.score} />
        <div className="wrapper">
          <text className="question">{this.state.question}</text>
          <Answer onSkipHandler={this._onSkipHandler} onSubmitHandler={this._onSubmitAnswerHandler} />
        </div>
      </>
    )
  }
}

export default TriviaGame
