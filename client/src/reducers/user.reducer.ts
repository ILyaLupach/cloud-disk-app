import { LOGOUT, SET_USER, UserAction } from '../actions/auth/types'
import { User } from '../types/User'

export type UserStateType = {
  isGuest: boolean
  currentUser: User | null
}

const defaultState: UserStateType = {
  isGuest: false,
  currentUser: null,
}

export default (state = defaultState, action: UserAction) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        isGuest: false,
        currentUser: action.payload
      }
      case LOGOUT:
        return {
          ...state,
          isGuest: true,
          currentUser: null
        }
    default:
      return state
  }
}
