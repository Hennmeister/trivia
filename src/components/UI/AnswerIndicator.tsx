import classes from './UI.module.css'
import React, { Component } from 'react'
import { timeStamp } from 'console'

interface Props {
  isCorrect: boolean
}
interface State {}

export default class AnswerIndicator extends Component<Props, State> {
  state = {}

  render() {
    const indicatorClasses = [classes.indicator]
    let charCode = 10004
    if (this.props.isCorrect) {
      indicatorClasses.push(classes.green)
    } else {
      charCode = 10008
      indicatorClasses.push(classes.red)
    }
    return <text className={indicatorClasses.join(' ')}>{String.fromCharCode(charCode)}</text>
  }
}
