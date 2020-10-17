import { User } from '../../types/User'

export const SET_USER = 'SEND_MESSAGE'
export const LOGOUT = 'LOGOUT'

interface SetUser {
  type: typeof SET_USER
  payload: User
}

interface LogOut {
  type: typeof LOGOUT
}

export type UserAction = SetUser | LogOut
