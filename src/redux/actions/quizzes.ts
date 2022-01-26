import { IQuizzes, SET_QUIZZES, SET_LASTQUIZ, SET_QUIZ_IS_LOADED, action } from "../../types"
import { getQuizzes } from '../../firebase'

export const setQuizzes = (data: IQuizzes) => ({
  type: SET_QUIZZES,
  payload: data,
})

export const setLastQuiz = (lastQuiz: object | null) => ({
  type: SET_LASTQUIZ,
  payload: lastQuiz,
})

export const setQuizIsLoaded = (state:boolean = true) => ({
  type: SET_QUIZ_IS_LOADED,
  payload: state,
})

export const fetchQuizzes = (lastQuiz: object | null = null) => (dispatch:(action: action) => void) => {
  getQuizzes(lastQuiz)
  .then((data) => {
    dispatch(setLastQuiz(data.lastQuiz))
    dispatch(setQuizzes(data.data))
  })
}