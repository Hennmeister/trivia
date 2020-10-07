import React, { Component } from 'react'
import { Category, Question } from '../../model'
import GameOver from '../GameMechanicInterfaces/GameOver'

import Survival from '../gamemodes/Survival'
import TimeRace from '../gamemodes/TimeRace'
import Title from '../UI/Title'

interface Props {
  gamemode: string
  category: Category
  restartGame: () => void
}

interface State {
  isGameOver: boolean
  score: number
  questions: Question[]
  answers: string[]
  isDoneCategory: boolean
}

class GamemodeManager extends Component<Props, State> {
  state = {
    isGameOver: false,
    score: 0,
    questions: [],
    answers: [],
    isDoneCategory: false,
  }

  endGame = (score: number, questions: Question[], answers: string[], isDoneCategory: boolean) => {
    this.setState({
      isGameOver: true,
      score: score,
      questions: questions,
      answers: answers,
      isDoneCategory: isDoneCategory,
    })
  }

  render() {
    let mode = <Survival categoryId={this.props.category.id} endGame={this.endGame} />
    switch (this.props.gamemode) {
      case 'TimeRace':
        mode = <TimeRace categoryId={this.props.category.id} endGame={this.endGame} />
        break
      default:
        mode = <Survival categoryId={this.props.category.id} endGame={this.endGame} />
    }
    return (
      <>
        <Title>Trivia!</Title>
        {this.state.isGameOver ? (
          <GameOver
            categoryTitle={this.props.category.title}
            gamemode={this.props.gamemode}
            score={this.state.score}
            questions={this.state.questions}
            answers={this.state.answers}
            restart={this.props.restartGame}
            isDoneQuestions={this.state.isDoneCategory}
          />
        ) : (
          mode
        )}
      </>
    )
  }
}

export default GamemodeManager
