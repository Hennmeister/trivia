import classes from './UI.module.css'
import React, { Component } from 'react'

interface Props {}
interface State {}

export default class Title extends Component<Props, State> {
  render() {
    return (
      <div className={classes.gameTitleWrapper}>
        <text className={classes.gameTitle}>{this.props.children}</text>
      </div>
    )
  }
}
