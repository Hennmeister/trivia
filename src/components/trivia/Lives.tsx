import classes from '*.module.css'
import { throws } from 'assert'
import React, { Component } from 'react'

interface Props {
  onNoLivesRemaining: () => void
}
interface State {
  lives: number
}

class Lives extends Component<Props, State> {
  state = {
    lives: 3,
  }

  render() {
    let livesClasses = ['lives']
    let heartClasses = ['heart']
    if (this.state.lives === 1) {
      livesClasses.push('danger')
      heartClasses.push('danger')
    }
    return (
      <>
        <div className={heartClasses.join(' ')}></div>
        <text className={livesClasses.join(' ')}>{'x ' + this.state.lives}</text>
      </>
    )
  }
}

export default Lives
