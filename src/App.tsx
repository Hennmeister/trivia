import React, { Component } from 'react'
import Start from './components/StartScreen/StartScreen'
import GameManager from './components/trivia/GameManager'

interface Props {}
interface State {
  isInGame: boolean
  gamemode: string
  category: number
}
class App extends Component<Props, State> {
  state = {
    isInGame: false,
    gamemode: '',
    category: 0,
  }
  _startGame = (gamemode: string, category: number) => {
    this.setState({ isInGame: true, gamemode: gamemode, category: category })
  }
  render() {
    return (
      <div>
        {this.state.isInGame ? (
          <GameManager category={this.state.category} gamemode={this.state.gamemode} />
        ) : (
          <Start startGame={this._startGame}></Start>
        )}
      </div>
    )
  }
}

export default App
