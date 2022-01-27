import { SET_QUIZZES, action, SET_LASTQUIZ } from "../../types"

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
    default :
      return state
  }
}

export default quizzes