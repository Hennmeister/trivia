export interface RequiredGameState {
  questions: Question[]
  score: number
  questionIndex: number
  questionsRequested: boolean
  userAnswers: string[]
}

export interface RequiredGameProps {
  categoryId: number
}

export type Answer = {
  answer: string
  isCorrect: boolean
}

export type Question = {
  question: string
  answers: Answer[]
  isBoolean: boolean
}

export type Gamemode = {
  mode: React.ElementType
  title: string
  desc: string
  pic: string
}

export type Category = {
  title: string
  id: number
}

export type Selectable = {
  categories: Category[]
  gamemodes: Gamemode[]
}
