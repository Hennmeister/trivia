import classes from './trivia.module.css'
import React, { Component } from 'react'
import { Question } from '../../model'

interface Props {
  question: Question
  onSubmitHandler: (isCorrect: boolean, answer: string) => void
  onSkipHandler: (answer: string) => void
  isSkipDisabled: boolean
}

interface State {
  inputValue: string
}

class AnswerControls extends Component<Props, State> {
  render() {
    let { question, onSubmitHandler, onSkipHandler, isSkipDisabled } = this.props
    let skipButtonClasses = isSkipDisabled ? [classes.skip, classes.disabled] : [classes.skip]
    const answerButtons = question.answers.map((ans) => (
      <button onClick={() => onSubmitHandler(ans.isCorrect, ans.answer)}>{ans.answer}</button>
    ))
    return (
      <div>
        {answerButtons}
        <button
          disabled={isSkipDisabled}
          className={skipButtonClasses.join(' ')}
          onClick={() => {
            onSkipHandler(question.answers.filter((ans) => ans.isCorrect)[0].answer)
            this.setState({ inputValue: '' })
          }}
        >
          SKIP
        </button>
      </div>
    )
  }
}

export default AnswerControls
