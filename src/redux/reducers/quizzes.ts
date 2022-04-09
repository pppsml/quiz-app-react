import { action, SET_QUIZZES_IS_LOADING, SET_QUIZZES, SET_LASTQUIZ, RESET_QUIZZES, SET_SORT_INDEX } from "../../types"

import { IQuizzesState } from "../../types"

const initialState:IQuizzesState = {
  quizzes: {
    items: [],
  },
  lastQuiz: {
    item: null,
    hasMore: true,
  },
  quizzesIsLoading: false,
  sortIndex: 1,
}

const quizzes = (state:IQuizzesState = initialState, action: action) => {
  switch (action.type) {
    case SET_QUIZZES_IS_LOADING:
      return {
        ...state,
        quizzesIsLoading: action.payload,
      }
    case SET_QUIZZES:
      return {
        ...state,
        quizzes: {
          items: [
            ...state.quizzes.items,
            ...action.payload],
        },
      }
      case SET_LASTQUIZ:
        return {
          ...state,
          lastQuiz: action.payload,
        }
      case RESET_QUIZZES:
        return {
          ...state,
          quizzes: {
            items: [],
          },
          lastQuiz: {
            item: null,
            hasMore: true,
          },
        }

      case SET_SORT_INDEX:
        return {
          ...state,
          sortIndex: action.payload
        }
    default :
      return state
  }
}

export default quizzes