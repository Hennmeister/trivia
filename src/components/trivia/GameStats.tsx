import React, { Component } from 'react'
import classes from './trivia.module.css'

interface Props {
  score: number
  remainingSkips?: number
  toHideSkips?: boolean
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
      console.log('YES')
      this.setState({ animateScoreText: true })
      setTimeout(() => {
        this.setState({ animateScoreText: false })
      }, 900)
    }
  }
  render() {
    let skipClassNames = [classes.score, classes.skips]
    let scoreClassNames = [classes.score]

    if (this.state.animateSkipText) {
      skipClassNames.push(classes.skipChange)
    }
    if (this.state.animateScoreText) {
      scoreClassNames.push(classes.scoreChange)
      console.log(scoreClassNames)
    }
    return (
      <>
        <text className={scoreClassNames.join(' ')}>{'SCORE: ' + this.props.score}</text>
        {this.props.toHideSkips ? null : (
          <text className={skipClassNames.join(' ')}>{'SKIPS: ' + this.props.remainingSkips}</text>
        )}
      </>
    )
  }
}

export default GameStats
