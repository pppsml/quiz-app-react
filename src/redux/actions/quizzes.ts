import { IQuizData, IFetchingQuizData, SET_QUIZZES, SET_LASTQUIZ, action } from "../../types"
import { getQuizzes } from '../../firebase'

export const setQuizzes = (data:IQuizData[]):action => ({
  type: SET_QUIZZES,
  payload: data,
})

export const setLastQuiz = (lastQuiz: object | null, hasMore: boolean):action => ({
  type: SET_LASTQUIZ,
  payload: {
    item: lastQuiz,
    hasMore,
  },
})

export const fetchQuizzes = (lastQuiz: object | null = null) => (dispatch:(action: action) => void) => {
  getQuizzes(lastQuiz)
  .then(({data, lastQuiz}:IFetchingQuizData) => {
    dispatch(setLastQuiz(lastQuiz.item, lastQuiz.hasMore))
    dispatch(setQuizzes(data))
  })
}