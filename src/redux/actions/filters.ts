import { action, SET_SORT_INDEX } from "../../types";


export const setSortIndex = (sortIndex: number):action => ({
  type: SET_SORT_INDEX,
  payload: sortIndex,
})