import classes from './gameMechanicInterfaces.module.css'
import React, { Component } from 'react'
import { Selectables } from '../gamemodes/Selectables'
import SelectorModel from '../UI/SelectorModel'
import { Gamemode, Category } from '../../model'
import { isGamemode } from '../../gameUtils'
import Title from '../UI/Title'

interface Props {
  startGame: (gamemode: string, category: Category) => void
}
interface State {
  isSelecting: boolean
  selectionIndex: number
  category: Category
  gamemode: string
}

export default class Start extends Component<Props, State> {
  state = {
    isSelecting: false,
    selectionIndex: 0,
    gamemode: '',
    category: { title: '', id: 0 },
  }

  _buttonPressHandler = () => {
    this.setState({ isSelecting: true })
  }

  itemPressHandler = (item: Gamemode | Category) => {
    if (isGamemode(item)) {
      this.setState({ gamemode: item.title })
    } else {
      this.setState({ category: { title: item.title, id: item.id } })
    }

    if (this.state.selectionIndex === Selectables.length - 1) {
      this.props.startGame(item.title, this.state.category)
    } else {
      this.setState((prevProps) => {
        this.setState({ selectionIndex: prevProps.selectionIndex + 1 })
      })
    }
  }

  render() {
    const display = this.state.isSelecting ? (
      <>
        <Title>Choose Your {this.state.selectionIndex === 0 ? 'Category' : 'Gamemode'}</Title>
        <SelectorModel items={Selectables[this.state.selectionIndex]} onItemPress={this.itemPressHandler} />
      </>
    ) : (
      <button onClick={this._buttonPressHandler} className={classes.btn}>
        START
      </button>
    )
    return <div className={classes.bg}>{display}</div>
  }
}
