import { Action } from 'redux'

const defaultState = {}

export default (state = defaultState, action: Action<any>) => {
  switch (action.type) {
    default:
      return state
  }
}
