import React, { Component } from 'react'

interface Props {
  score: number
  remainingSkips: number
}
interface State {
  animateSkipText: boolean
  animateScoreText: boolean
}

class GameStats extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      animateSkipText: false,
      animateScoreText: false,
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.remainingSkips !== this.props.remainingSkips) {
      this.setState({ animateSkipText: true })
      setTimeout(() => {
        this.setState({ animateSkipText: false })
      }, 900)
    } else if (prevProps.score !== this.props.score) {
      this.setState({ animateScoreText: true })
      setTimeout(() => {
        this.setState({ animateScoreText: false })
      }, 900)
    }
  }
  render() {
    let skipClassNames = ['score', 'skips']
    let scoreClassNames = ['score']

    if (this.state.animateSkipText) {
      skipClassNames.push('skipChange')
    }
    if (this.state.animateScoreText) {
      scoreClassNames.push('scoreChange')
    }
    return (
      <>
        <text className={scoreClassNames.join(' ')}>{'SCORE: ' + this.props.score}</text>
        <text className={skipClassNames.join(' ')}>{'SKIPS: ' + this.props.remainingSkips}</text>
      </>
    )
  }
}

export default GameStats
