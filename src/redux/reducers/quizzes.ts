import { action, SET_QUIZZES, SET_LASTQUIZ, SET_RESETTED_QUIZZES } from "../../types"

import { IQuizzesState } from "../../types"

const initialState:IQuizzesState = {
  quizzes: {
    items: [],
  },
  lastQuiz: {
    item: null,
    hasMore: true,
  },
  quizIsLoaded: false,
}

const quizzes = (state:IQuizzesState = initialState, action: action) => {
  switch (action.type) {
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
      case SET_RESETTED_QUIZZES:
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

export default quizzes