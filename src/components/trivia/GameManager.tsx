import React, { Component } from 'react'

import Survival from '../gamemodes/Survival'
import TimeRace from '../gamemodes/TimeRace'
import Title from '../UI/Title'

interface Props {
  gamemode: string
  category: number
}

interface State {}

class GamemodeManager extends Component<Props, State> {
  itemPressHandler = () => {}
  render() {
    let mode = <Survival categoryId={this.props.category} />
    switch (this.props.gamemode) {
      case 'TimeRace':
        mode = <TimeRace categoryId={this.props.category} />
        break
      default:
        mode = <Survival categoryId={this.props.category} />
    }
    return (
      <>
        <Title>Trivia!</Title>
        {mode}
      </>
    )
  }
}

export default GamemodeManager
