import axios, { AxiosResponse } from 'axios'

import { Dispatch } from 'redux';
import { File } from '../../types/File';
import { FilesAction, SET_FILES } from './types';

interface Response extends AxiosResponse {
  data: File[]
}

export const getFiles = (dirId: string) =>
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
      console.log(error.responce.data.message)
    }
  }
