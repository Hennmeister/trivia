import { Question, Answer, Gamemode, Category } from './model'
import axios from 'axios'
import { assert } from 'console'

const HTMLEncodings = {
  '&#039;': "'",
  '&quot;': '"',
  '&rsquo;': "'",
}

export const getSessionToken = async () => {
  return axios
    .get('https://opentdb.com/api_token.php?command=request')
    .then((response) => {
      return response.data.token
    })
    .catch((err) => console.log(err))
}

const getQuestionRequest = (categoryId: number, token: string) => {
  return axios
    .get('https://opentdb.com/api.php?amount=50&category=' + categoryId + '&token=' + token)
    .then((response) => {
      return response.data
    })
    .catch((err) => console.log(err))
}

export const makeQuestionRequest = async (categoryId: number, token: string) => {
  let questions: Question[] = []
  return await getQuestionRequest(categoryId, token)
    .then((data) => {
      let questions_data = data.results

      let { response_code }: { response_code: number } = data

      for (let i = 0; i < 10; i++) {
        let answers: Answer[] = [
          {
            answer: questions_data[i].correct_answer.replace(/&quot;|&#039;/gi, (matched) => HTMLEncodings[matched]),
            isCorrect: true,
          },
        ]
        if (questions_data[i].type === 'boolean') {
          answers.push({
            answer: questions_data[i].incorrect_answers[0].replace(
              /&quot;|&#039;/gi,
              (matched) => HTMLEncodings[matched]
            ),
            isCorrect: false,
          })
        } else {
          for (let j = 0; j < 3; j++) {
            answers.push({
              answer: questions_data[i].incorrect_answers[j].replace(
                /&quot;|&#039;/gi,
                (matched) => HTMLEncodings[matched]
              ),
              isCorrect: false,
            })
          }
        }
        _shuffle(answers)
        let question: Question = {
          question: questions_data[i].question.replace(/&quot;|&#039;/gi, (matched) => HTMLEncodings[matched]),
          answers: answers,
          isBoolean: questions_data[i].type === 'boolean',
        }
        questions.push(question)
      }
      return questions
    })
    .catch((err) => console.log(err))
}

const _shuffle = (arr: Answer[]) => {
  let j, x, i
  for (i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1))
    x = arr[i]
    arr[i] = arr[j]
    arr[j] = x
  }
  return arr
}

export const isGamemode = (item: Gamemode | Category): item is Gamemode => {
  return (item as Gamemode).mode !== undefined
}
