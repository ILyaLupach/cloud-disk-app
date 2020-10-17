import { ADD_FILE, FilesAction, GO_TO_BACK, PUSH_TO_STACK, SET_CURRENT_DIR, SET_FILES } from '../actions/files/types'
import { File } from '../types/File'

export type FileStateType = {
  currentDir: string | null
  files: File[]
  dirStack: string[]
}

const defaultState: FileStateType = {
  files: [],
  currentDir: null,
  dirStack: []
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
    case ADD_FILE:
      return {
        ...state,
        files: [...state.files, action.payload]
      }
    case PUSH_TO_STACK:
      return {
        ...state,
        dirStack: [...state.dirStack, action.payload]
      }
    default:
      return state
  }
}
