import { action, IUserState, SET_USER } from "../../types";

const initState:IUserState = {
  userData: null,
  isAuthenticated: false,
}

const userReducer = (state:IUserState = initState, action: action):IUserState => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        userData: action.payload,
        isAuthenticated: !!action.payload,
      };
    
    default: return state
  }
}

export default userReducer