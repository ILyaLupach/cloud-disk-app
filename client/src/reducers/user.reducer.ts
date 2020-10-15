import { Action } from 'redux'

const defaultState = {
  currentUser: {},
  isAuth: false,
}

export default (state = defaultState, action: Action<any>) => {
  switch (action.type) {
    default:
      return state
  }
}
