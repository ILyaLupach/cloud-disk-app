import { File } from '../types/File'
import { ADD_UPLOAD_FILE, CHANGE_UPLOAD_PROGRESS, REMOVE_UPLOAD_FILE, SHOW_UPLOADER, UploadAction } from '../actions/upload/types'
import { fileURLToPath } from 'url'

export type UploadStateType = {
  progress: number
  isVisible: boolean
  files: UploadFile[]
}

type UploadFile = {
  name: string
  progress: number
  id: number
}

const defaultState: UploadStateType = {
  progress: 0,
  isVisible: false,
  files: []
}

export default (state = defaultState, action: UploadAction) => {
  switch (action.type) {
    case SHOW_UPLOADER:
      return {
        ...state,
        isVisible: action.payload
      }
    case ADD_UPLOAD_FILE:
      return {
        ...state,
        files: [...state.files, action.payload]
      }
    case REMOVE_UPLOAD_FILE:
      return {
        ...state,
        files: state.files.filter(file => file.id !== action.payload)
      }
    case CHANGE_UPLOAD_PROGRESS:
      return {
        ...state,
        files: state.files.map(file => (
          file.id === action.payload.id
            ? {...file, progress: action.payload.progress}
            : file
        ))
      }
    default:
      return state
  }
}
