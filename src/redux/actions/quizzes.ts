import { IQuizData, IFetchingQuizData, SET_QUIZZES_IS_LOADING, SET_QUIZZES, SET_LASTQUIZ, RESET_QUIZZES, action } from "../../types"
import { getQuizzes } from '../../firebase/firebase-quizzes'

const setQuizzesIsLoading = (loadingState: boolean):action => ({
  type: SET_QUIZZES_IS_LOADING,
  payload: loadingState,
})

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

export const resetQuizzes = {
  type: RESET_QUIZZES,
}

export const fetchQuizzes = (orderPath: string, order: 'asc' | 'desc' = 'desc', lastQuiz: object | null = null) => (dispatch:(action: action) => void) => {
  dispatch(setQuizzesIsLoading(true))
  getQuizzes(orderPath, order, lastQuiz)
  .then(({data, newLastQuiz}:IFetchingQuizData) => {
    dispatch(setLastQuiz(newLastQuiz.item, newLastQuiz.hasMore))
    dispatch(setQuizzes(data))
    dispatch(setQuizzesIsLoading(false))
  })
}