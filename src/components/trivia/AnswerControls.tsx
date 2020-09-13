import React, { Component } from 'react'

interface Props {
  onSubmitHandler: (answer: string) => void
  onSkipHandler: () => boolean
  isSkipDisabled: boolean
}

interface State {
  inputValue: string
}

class AnswerControls extends Component<Props, State> {
  state = {
    inputValue: '',
  }

  _inputOnChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ inputValue: e.currentTarget.value })
  }

  _onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      this.props.onSubmitHandler(this.state.inputValue)
      this.setState({ inputValue: '' })
    }
  }

  render() {
    let { onSubmitHandler } = this.props
    let skipButtonClasses = this.props.isSkipDisabled ? ['skip', 'disabled'] : ['skip']
    return (
      <div>
        <input
          value={this.state.inputValue}
          onChange={this._inputOnChangeHandler}
          placeholder={'type your answer here...'}
          onKeyDown={this._onKeyDownHandler}
        ></input>
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
        <button
          className={'submit'}
          onClick={() => {
            onSubmitHandler(this.state.inputValue)
            this.setState({ inputValue: '' })
          }}
        >
          SUBMIT
        </button>
      </div>
    )
  }
}

export default AnswerControls
