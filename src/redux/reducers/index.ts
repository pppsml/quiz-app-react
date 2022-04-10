import { combineReducers } from 'redux'

import quizzes from './quizzes'
import filters from './filters'
import user from './user'

const rootReducer = combineReducers({
  quizzes,
  filters,
  user,
})

export default rootReducer