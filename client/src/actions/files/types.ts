import { File } from '../../types/File'

export const SET_FILES = 'SET_FILES'
export const SET_CURRENT_DIR = 'SET_CURRENT_DIR'

interface SetFiles {
  type: typeof SET_FILES
  payload: File[]
}

interface SetCurrentDir {
  type: typeof SET_CURRENT_DIR
  payload: string
}

export type FilesAction = SetFiles | SetCurrentDir
