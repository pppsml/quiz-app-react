import { IQuizzes, SET_QUIZZES, SET_LASTQUIZ, action } from "../../types"
import { getQuizzes } from '../../firebase'

export const setQuizzes = (data: IQuizzes) => ({
  type: SET_QUIZZES,
  payload: data,
})

export const setLastQuiz = (lastQuiz: object | null) => ({
  type: SET_LASTQUIZ,
  payload: lastQuiz,
})

export const fetchQuizzes = (lastQuiz: object | null = null) => (dispatch:(action: action) => void) => {
  getQuizzes(lastQuiz)
  .then((data) => {
    console.log(data)
    dispatch(setLastQuiz(data.lastQuiz))
    dispatch(setQuizzes(data.data))
    console.log('lastquiz data', data.lastQuiz.data())
  })
}