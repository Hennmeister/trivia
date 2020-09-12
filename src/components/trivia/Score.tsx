import React, { Component } from 'react'

interface Props {
  score: number
}
interface State {}

class Score extends Component<Props, State> {
  render() {
    return <text className={'score'}>{'SCORE: ' + this.props.score}</text>
  }
}

export default Score
