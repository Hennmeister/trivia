import React, { Component } from 'react'
import { Category, Gamemode } from '../../model'
import DisplayItem from './DisplayItem'
import classes from './UI.module.css'
import { isGamemode } from '../../gameUtils'

interface Props {
  items: Gamemode[] | Category[]
  onItemPress: (item: Gamemode | Category) => void
}
interface State {}

export default class SelectorModel extends Component<Props, State> {
  state = {}

  render() {
    let displayItems
    if (isGamemode(this.props.items[0])) {
      // Displaying Gamemodes
      displayItems = (this.props.items as Array<Gamemode>).map((item) => {
        return (
          <DisplayItem
            title={item.title}
            pic={item.pic}
            description={item.desc}
            onPress={() => {
              this.props.onItemPress(item)
            }}
          />
        )
      })
    } else {
      // Displaying Categories
      displayItems = (this.props.items as Array<Category>).map((item) => {
        return (
          <DisplayItem
            title={item.title}
            onPress={() => {
              this.props.onItemPress(item)
            }}
          />
        )
      })
    }
    return (
      <>
        <div className={classes.selectorModel}>{displayItems}</div>
      </>
    )
  }
}
