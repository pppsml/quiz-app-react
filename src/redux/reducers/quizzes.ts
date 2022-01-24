import { SET_QUIZZES, action } from "../../types"

import { IQuizzesState } from "../../types"

const initialState:IQuizzesState = {
  quizzes: {
    items: {},
    isLoaded: false,
  },
}

const quizzes = (state:IQuizzesState = initialState, action: action) => {
  switch (action.type) {
    case SET_QUIZZES: 
      return {
        ...state,
        quizzes: {
          ...state.quizzes,
          items: action.payload,
          isLoaded: true,
        },
      }
    default :
      return state
  }
}

export default quizzes