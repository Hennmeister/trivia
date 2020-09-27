import React, { Component } from 'react'
import SelectorModel from '../UI/SelectorModel'
import { Gamemodes, Categories } from '../gamemodes/Selectables'
import classes from './trivia.module.css'

import Survival from '../gamemodes/Survival'
import TimeRace from '../gamemodes/TimeRace'
import { Category, Gamemode, Selectable } from '../../model'
import Title from '../UI/Title'
import { isThisTypeNode } from 'typescript'

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
