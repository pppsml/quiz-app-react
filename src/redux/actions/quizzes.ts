import { IQuizData, IFetchingQuizData, SET_QUIZZES_IS_LOADING, SET_QUIZZES, SET_LASTQUIZ, RESET_QUIZZES, action, SET_SORT_INDEX } from "../../types"
import { getQuizzes } from '../../firebase'

const setQuizzesIsLoading = (loadingState: boolean):action => ({
  type: SET_QUIZZES_IS_LOADING,
  payload: loadingState,
})

export const setSortIndex = (sortIndex: number):action => ({
  type: SET_SORT_INDEX,
  payload: sortIndex,
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

export const fetchQuizzes = (orderPaths: string, order: 'asc' | 'desc' = 'desc', lastQuiz: object | null = null) => (dispatch:(action: action) => void) => {
  dispatch(setQuizzesIsLoading(true))
  getQuizzes(orderPaths, order, lastQuiz)
  .then(({data, newLastQuiz}:IFetchingQuizData) => {
    dispatch(setLastQuiz(newLastQuiz.item, newLastQuiz.hasMore))
    dispatch(setQuizzes(data))
    dispatch(setQuizzesIsLoading(false))
  })
}