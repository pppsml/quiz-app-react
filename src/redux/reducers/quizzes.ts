import { SET_QUIZZES, action } from "../../types"

import { IQuizzesState } from "../../types"

const initialState:IQuizzesState = {
  quizzes: {}
}

const quizzes = (state:IQuizzesState = initialState, action: action) => {
  switch (action.type) {
    case SET_QUIZZES: 
      return {
        ...state,
        quizzes: {...state.quizzes, ...action.payload}
      }
    default :
      return state
  }
}

export default quizzes