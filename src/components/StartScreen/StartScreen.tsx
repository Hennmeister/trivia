import classes from './startScreen.module.css'
import React, { Component } from 'react'
import { Selectables, NextSelectable } from '../gamemodes/Selectables'
import SelectorModel from '../UI/SelectorModel'
import { Gamemode, Category } from '../../model'
import { isGamemode } from '../../gameUtils'

interface Props {
  startGame: (gamemode: string, category: number) => void
}
interface State {
  isSelecting: boolean
  selectionIndex: number
  category: number
  gamemode: string
}

export default class Start extends Component<Props, State> {
  state = {
    isSelecting: false,
    selectionIndex: 0,
    gamemode: '',
    category: 0,
  }

  _buttonPressHandler = () => {
    this.setState({ isSelecting: true })
  }

  itemPressHandler = (item: Gamemode | Category) => {
    if (isGamemode(item)) {
      this.setState({ gamemode: item.title })
    } else {
      this.setState({ category: item.id })
    }

    if (this.state.selectionIndex === Selectables.length - 1) {
      this.props.startGame(this.state.gamemode, this.state.category)
    } else {
      this.setState((prevProps) => {
        this.setState({ selectionIndex: prevProps.selectionIndex + 1 })
      })
    }
  }

  render() {
    const display = this.state.isSelecting ? (
      <SelectorModel items={Selectables[this.state.selectionIndex]} onItemPress={this.itemPressHandler} />
    ) : (
      <button onClick={this._buttonPressHandler} className={classes.btn}>
        START
      </button>
    )
    return <div className={classes.bg}>{display}</div>
  }
}
