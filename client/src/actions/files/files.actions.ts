import axios, { AxiosResponse } from 'axios'

import { Dispatch } from 'redux';
import { RootState } from '../../reducers';
import { FileStateType } from '../../reducers/files.reducer';
import { File } from '../../types/File';
import { ADD_FILE, FilesAction, GO_TO_BACK, PUSH_TO_STACK, SET_CURRENT_DIR, SET_FILES } from './types';

interface Response extends AxiosResponse {
  data: File[]
}

export const getFiles = (dirId: string | null) =>
  async (dispatch: Dispatch<FilesAction>) => {
    try {
      const { data } = await axios.get(`api/files${dirId ? '?parent=' + dirId : ''}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      )
      dispatch({
        type: SET_FILES,
        payload: data
      })
    } catch (error) {
      console.log(error.responcee)
    }
  }

export const createDir = (dirId: string | null, name: string, type: string) =>
  async (dispatch: Dispatch<FilesAction>) => {
    try {
      const { data } = await axios.post('api/files', {
        name: name,
        parent: dirId,
        type: type,
      },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      )
      dispatch({
        type: ADD_FILE,
        payload: data
      })
    } catch (error) {
      console.log(error.responce)
    }
  }

export const setCurrentDir = (dirId: string | null) =>
  (dispatch: Dispatch<FilesAction>) => {
    dispatch({
      type: SET_CURRENT_DIR,
      payload: dirId
    })
  }

export const pushToStack = (dirId: string | null) =>
  (dispatch: Dispatch<FilesAction>) => {
    dispatch({
      type: PUSH_TO_STACK,
      payload: dirId
    })
  }
