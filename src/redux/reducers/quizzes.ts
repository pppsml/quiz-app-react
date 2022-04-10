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
}

const quizzesReducer = (state:IQuizzesState = initialState, action: action):IQuizzesState => {
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
    default :
      return state
  }
}

export default quizzesReducer