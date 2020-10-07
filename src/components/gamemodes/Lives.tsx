import classes from './gamemodes.module.css'
import React, { Component } from 'react'

interface Props {
  lives: number
}
interface State {}

class Lives extends Component<Props, State> {
  render() {
    let livesClasses = [classes.lives]
    let heartClasses = [classes.heart]
    if (this.props.lives === 1) {
      livesClasses.push(classes.danger)
      heartClasses.push(classes.danger)
    }
    return (
      <>
        <div className={heartClasses.join(' ')}></div>
        <text className={livesClasses.join(' ')}>{'x ' + this.props.lives}</text>
      </>
    )
  }
}

export default Lives
