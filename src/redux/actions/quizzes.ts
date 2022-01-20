import { ADD_QUIZZES } from "../actionTypes"

export const addQuizzes = (data: {}) => ({
  type: ADD_QUIZZES,
  payload: data,
})