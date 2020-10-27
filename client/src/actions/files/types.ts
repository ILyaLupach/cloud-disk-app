import { File } from '../../types/File'

export const SET_FILES = 'SET_FILES'
export const SET_CURRENT_DIR = 'SET_CURRENT_DIR'
export const ADD_FILE = 'ADD_FILE'
export const PUSH_TO_STACK = 'PUSH_TO_STACK'
export const REMOVE_FILE = 'REMOVE_FILE'
export const CHANGE_PLATE = 'CHANGE_PLATE'

interface SetFiles {
  type: typeof SET_FILES
  payload: File[]
}

interface SetCurrentDir {
  type: typeof SET_CURRENT_DIR
  payload: string | null
}

interface AddFile {
  type: typeof ADD_FILE
  payload: File
}

interface PushToStack {
  type: typeof PUSH_TO_STACK
  payload: string | null
}

interface RemoveFile {
  type: typeof REMOVE_FILE
  payload: string
}

interface ChangePlate {
  type: typeof CHANGE_PLATE
  payload: number
}

export type FilesAction =
  SetFiles | SetCurrentDir | AddFile | PushToStack | RemoveFile | ChangePlate
