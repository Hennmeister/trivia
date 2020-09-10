import React, { Component } from 'react'
import './trivia.css'
import axios from '../axios-instance'

interface Props {}
interface State {
  question: string
  answer: string
  prevQuestionIds: Set<string>
}

class TriviaGame extends Component<Props, State> {
  state = {
    question: '',
    answer: '',
    prevQuestionIds: new Set<string>(),
  }

  componentDidMount() {
    console.log('here')
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
  render() {
    return (
      <div className="wrapper">
        <text className="question">{this.state.question}</text>
        <input defaultValue={this.state.answer}></input>
        <button>Submit</button>
      </div>
    )
  }
}

export default TriviaGame
