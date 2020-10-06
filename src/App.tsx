import React, { Component } from 'react'
import GameOver from './components/GameMechanicInterfaces/GameOver'
import StartScreen from './components/GameMechanicInterfaces/StartScreen'
import GameManager from './components/trivia/GameManager'
import AnswerIndicator from './components/UI/AnswerIndicator'
import { Category } from './model'

interface Props {}
interface State {
  isInGame: boolean
  gamemode: string
  category: Category
}
class App extends Component<Props, State> {
  state = {
    isInGame: false,
    gamemode: '',
    category: { title: '', id: 0 },
  }
  _startGame = (gamemode: string, category: Category) => {
    console.log('y0' + gamemode)
    this.setState({ isInGame: true, gamemode: gamemode, category: category })
  }

  _restartGame = () => {
    this.setState({ isInGame: false, gamemode: '', category: { title: '', id: 0 } })
  }
  render() {
    return (
      <div className={'background'}>
        {this.state.isInGame ? (
          <GameManager restartGame={this._restartGame} category={this.state.category} gamemode={this.state.gamemode} />
        ) : (
          <StartScreen startGame={this._startGame}></StartScreen>
        )}
      </div>
    )
  }
}

export default App
