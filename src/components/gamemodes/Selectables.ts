import Survival from './Survival'
import TimeRace from './TimeRace'
import { Category, Gamemode } from '../../model'

import SurvivalImg from '../../assets/SurvivalIcon.png'
import TimeRaceImg from '../../assets/TimeRaceIcon.png'

/* Gamemodes */

export const SurvivalMode: Gamemode = {
  mode: Survival,
  title: 'Survival',
  desc: 'Play for a high score with an initial 3 lives and 3 skips',
  pic: SurvivalImg,
}

export const TimeRaceMode: Gamemode = {
  mode: TimeRace,
  title: 'TimeRace',
  desc: 'Answer as many correct questions as you can in 2 minutes',
  pic: TimeRaceImg,
}

export const Gamemodes: Gamemode[] = [TimeRaceMode, SurvivalMode]

/* Categories */

export const Categories: Category[] = [
  { title: 'General Knowledge', id: 9 },
  { title: 'Video Games', id: 15 },
  { title: 'Sports', id: 21 },
  { title: 'Computers', id: 18 },
  { title: 'Mathematics', id: 19 },
  { title: 'Geography', id: 22 },
  { title: 'History', id: 23 },
  { title: 'Animals', id: 27 },
  { title: 'Vehicles', id: 28 },
]

export const Selectables = [Categories, Gamemodes]

export enum NextSelectable {
  Category = 'Gamemode',
  Gamemode = '',
}
