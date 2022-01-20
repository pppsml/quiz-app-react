import { ADD_QUIZZES, action } from "../actionTypes"

const initialState = {
  quizzes: {} = {}
}

const quizzes = (state = initialState, action: action) => {
  switch (action.type) {
    case ADD_QUIZZES: 
      return {
        ...state,
        quizzes: {...state.quizzes, ...action.payload}
      }
    default :
      return state
  }
}

export default quizzes