import { IQuizzes, SET_QUIZZES, action } from "../../types"
import { getQuizzes } from '../../firebase'

export const setQuizzes = (data: IQuizzes) => ({
  type: SET_QUIZZES,
  payload: data,
})

export const fetchQuizzes = () => (dispatch:(action: action) => void) => {
  getQuizzes().then((data) => {dispatch(setQuizzes(data))})
}