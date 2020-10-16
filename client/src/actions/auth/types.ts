import { User } from '../../types/User'

export const SET_USER = 'SEND_MESSAGE'
export const LOGOUT = 'LOGOUT'

interface SetUserAction {
  type: typeof SET_USER
  payload: User
}

interface LogOutAction {
  type: typeof LOGOUT
}

export type UserActionTypes = SetUserAction | LogOutAction
