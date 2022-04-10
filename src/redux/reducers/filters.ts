import { action, IFiltersState, SET_SORT_INDEX } from "../../types"

const initState:IFiltersState = {
  sortIndex: 1 ,
}

const filtersReducer = (state:IFiltersState = initState, action: action):IFiltersState => {
  switch (action.type) {
    case SET_SORT_INDEX:
      return {
        ...state,
        sortIndex: action.payload,
      }

    default: return state
  }
}

export default filtersReducer