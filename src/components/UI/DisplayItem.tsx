import React, { Component } from 'react'

import classes from './UI.module.css'

interface Props {
  title: string
  onPress: () => void
  description?: string
  pic?: string
}
interface State {}

export default class DisplayItem extends Component<Props, State> {
  state = {}

  render() {
    const { pic, description, title, onPress } = this.props
    return (
      <div onClick={onPress} className={classes.item}>
        <text className={classes.title}>{title}</text>
        {pic ? <img className={classes.displayImg} src={pic} alt={title}></img> : false}
        {description ? <text className={classes.description}>{description}</text> : false}
      </div>
    )
  }
}
