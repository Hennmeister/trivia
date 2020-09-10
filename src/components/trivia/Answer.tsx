import React, { Component } from 'react'

interface Props {
  onSubmitHandler: (answer: string) => void
}

interface State {
  inputValue: string
}

class Answer extends Component<Props, State> {
  state = {
    inputValue: '',
  }

  _inputOnChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ inputValue: e.currentTarget.value })
  }

  render() {
    let { onSubmitHandler } = this.props
    return (
      <div>
        <input
          value={this.state.inputValue}
          onChange={this._inputOnChangeHandler}
          placeholder={'type your answer here...'}
        ></input>
        <button className={'skip'} onClick={() => onSubmitHandler('')}>
          SKIP
        </button>
        <button className={'submit'} onClick={() => onSubmitHandler(this.state.inputValue)}>
          SUBMIT
        </button>
      </div>
    )
  }
}

export default Answer
