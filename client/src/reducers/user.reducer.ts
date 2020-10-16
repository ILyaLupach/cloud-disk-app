import { LOGOUT, SET_USER, UserActionTypes } from '../actions/auth/types'
import { User } from '../types/User'

export type UserStateType = {
  isGuest: boolean
  currentUser: User | null
}

const defaultState: UserStateType = {
  isGuest: true,
  currentUser: null,
}

export default (state = defaultState, action: UserActionTypes) => {
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
