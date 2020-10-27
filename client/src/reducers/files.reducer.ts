import { ADD_FILE, CHANGE_PLATE, FilesAction, PUSH_TO_STACK, REMOVE_FILE, SET_CURRENT_DIR, SET_FILES } from '../actions/files/types'
import { File } from '../types/File'

export type FileStateType = {
  currentDir: string | null
  files: File[]
  dirStack: string[]
  plate: number
}

const defaultState: FileStateType = {
  files: [],
  currentDir: null,
  dirStack: [],
  plate: 1
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
    case REMOVE_FILE:
      return {
        ...state,
        files: state.files.filter(file => file._id !== action.payload)
      }
    case CHANGE_PLATE:
      return {
        ...state,
        plate: action.payload
      }
    default:
      return state
  }
}
