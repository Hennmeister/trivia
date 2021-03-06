import React, { Component } from 'react'
import classes from './gamemodes.module.css'

interface Props {
  onTimerEnd: () => void
}
interface State {
  timeLeft: number
  interval: NodeJS.Timeout
}

class Timer extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      timeLeft: 120,
      interval: setInterval(this._timer, 1000),
    }
  }

  _timer = () => {
    if (this.state.timeLeft > 0) {
      this.setState((prevState) => {
        this.setState({ timeLeft: prevState.timeLeft - 1 })
      })
    } else {
      clearInterval(this.state.interval)
      this.props.onTimerEnd()
    }
  }

  render() {
    let timerClasses = [classes.timer]
    if (this.state.timeLeft < 11) {
      timerClasses.push(classes.skipChange)
    }
    return <text className={timerClasses.join(' ')}>{'Time Left: ' + this.state.timeLeft}</text>
  }
}

export default Timer
