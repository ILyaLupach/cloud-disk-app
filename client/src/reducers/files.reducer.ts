import { FilesAction, SET_CURRENT_DIR, SET_FILES } from '../actions/files/types'
import { File } from '../types/File'

export type UserStateType = {
  currentDir: string
  files: File[]
}

const defaultState: UserStateType = {
  files: [],
  currentDir: ''
}

export default (state = defaultState, action: FilesAction) => {
  switch (action.type) {
    case SET_FILES:
      return {
        ...state,
        files: action.payload
      }
    case SET_CURRENT_DIR:
      return {
        ...state,
        currentDir: action.payload
      }
    default:
      return state
  }
}
