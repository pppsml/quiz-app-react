import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import quizzes from "./reducers/quizzes";

const composeEnhancers = window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(quizzes, composeEnhancers(applyMiddleware(thunk)))

export default store