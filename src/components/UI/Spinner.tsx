import React, { Component } from 'react'
import classes from './UI.module.css'

interface Props {}
interface State {}

export default class Spinner extends Component<Props, State> {
  state = {}

  render() {
    return (
      <div className={classes.spinnerWrapper}>
        <div className={classes.loader}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    )
  }
}
