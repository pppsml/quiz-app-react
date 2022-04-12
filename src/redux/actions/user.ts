import { User } from "firebase/auth";
import { action, SET_USER } from "../../types";

export const setUser = (userData: null | User):action => ({
  type: SET_USER,
  payload: userData,
})