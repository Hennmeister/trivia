import classes from './trivia.module.css'
import React, { Component } from 'react'
import { Question } from '../../model'

interface Props {
  question: Question
  onSubmitHandler: (isCorrect: boolean) => void
  onSkipHandler: () => void
  isSkipDisabled: boolean
}

interface State {
  inputValue: string
}

class AnswerControls extends Component<Props, State> {
  render() {
    let { question, onSubmitHandler, onSkipHandler, isSkipDisabled } = this.props
    let skipButtonClasses = this.props.isSkipDisabled ? [classes.skip, classes.disabled] : [classes.skip]
    const answerButtons = question.answers.map((ans) => (
      <button onClick={() => onSubmitHandler(ans.isCorrect)}>{ans.answer}</button>
    ))
    return (
      <div>
        {answerButtons}
        <button
          disabled={this.props.isSkipDisabled}
          className={skipButtonClasses.join(' ')}
          onClick={() => {
            this.props.onSkipHandler()
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
