import { File } from '../../types/File'

export const SHOW_UPLOADER = 'SHOW_UPLOADER'
export const ADD_UPLOAD_FILE = 'ADD_UPLOAD_FILE'
export const REMOVE_UPLOAD_FILE = 'REMOVE_UPLOAD_FILE'
export const CHANGE_UPLOAD_PROGRESS= 'CHANGE_UPLOAD_PROGRESS'

interface ShowUploader {
  type: typeof SHOW_UPLOADER
  payload: boolean
}

interface AddUploadFile {
  type: typeof ADD_UPLOAD_FILE
  payload: {
    name: string
    progress: number
  }
}

interface RemoveUploadFile {
  type: typeof REMOVE_UPLOAD_FILE
  payload: number
}

interface ChangeUploadProgress {
  type: typeof CHANGE_UPLOAD_PROGRESS
  payload: {
    id: number
    progress: number
  }
}

export type UploadAction = ShowUploader | AddUploadFile | RemoveUploadFile | ChangeUploadProgress
