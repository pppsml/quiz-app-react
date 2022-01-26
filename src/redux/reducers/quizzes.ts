import { SET_QUIZZES, action, SET_LASTQUIZ } from "../../types"

import { IQuizzesState } from "../../types"

const initialState:IQuizzesState = {
  quizzes: {
    items: {},
    isLoaded: false,
  },
  lastQuiz: null,
}

const quizzes = (state:IQuizzesState = initialState, action: action) => {
  console.log('payload', action.payload)
  switch (action.type) {
    case SET_QUIZZES: 
      return {
        ...state,
        quizzes: {
          ...state.quizzes,
          items: {
            ...state.quizzes.items,
            ...action.payload},
          isLoaded: true,
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