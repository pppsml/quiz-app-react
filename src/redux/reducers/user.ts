import { action, IUserState, SET_USER } from "../../types";

const initState:IUserState = {
  user: null
}

const userReducer = (state:IUserState = initState, action: action):IUserState => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    
    default: return state
  }
}

export default userReducer