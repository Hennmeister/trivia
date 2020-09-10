import React, { Component } from 'react'
import './trivia.css'
import axios from '../../axios-instance'
import Answer from './Answer'

interface Props {}
interface State {
  question: string
  answer: string
  prevQuestionIds: Set<string>
  score: number
}

class TriviaGame extends Component<Props, State> {
  state = {
    question: '',
    answer: '',
    prevQuestionIds: new Set<string>(),
    score: 0,
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
    // TODO: move checking to utils file
    console.log(answer, this.state.answer)
    if (
      answer
        .toUpperCase()
        .trim()
        .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '') === this.state.answer.trim().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '')
    ) {
      this.setState((prevState) => {
        this.setState({ score: prevState.score + 1 })
      })
    }
    this._getRandomQuestion()
  }

  render() {
    return (
      <>
        <text>{this.state.score}</text>
        <div className="wrapper">
          <text className="question">{this.state.question}</text>
          <Answer onSubmitHandler={this._onSubmitAnswerHandler} />
        </div>
      </>
    )
  }
}

export default TriviaGame
