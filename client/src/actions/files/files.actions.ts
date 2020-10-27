import axios from 'axios'

import { Dispatch } from 'redux';
import { File } from '../../types/File';
import { ADD_UPLOAD_FILE, CHANGE_UPLOAD_PROGRESS, SHOW_UPLOADER, UploadAction } from '../upload/types';
import { ADD_FILE, CHANGE_PLATE, FilesAction, PUSH_TO_STACK, REMOVE_FILE, SET_CURRENT_DIR, SET_FILES } from './types';

//TODO add Preloader
export const getFiles = (dirId: string | null, sort: string = 'type') =>
  async (dispatch: Dispatch<FilesAction>) => {
    try {
      let url: string = 'api/files'
      if (dirId) url = `api/files?parent=${dirId}`
      if (sort) url = `api/files?sort=${sort}`
      if (sort && dirId) url = `api/files?parent=${dirId}&sort=${sort}`
      const { data } = await axios.get(url,
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

export const uploadDFile = (file: any, parent?: string | null) =>
  async (dispatch: Dispatch<FilesAction | UploadAction>) => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      parent && formData.append('parent', parent)
      const uploadFile = { name: file.name, progress: 0, id: Date.now() }
      dispatch({
        type: ADD_UPLOAD_FILE,
        payload: uploadFile
      })
      dispatch({
        type: SHOW_UPLOADER,
        payload: true
      })
      const { data } = await axios.post('api/files/upload',
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          onUploadProgress: (progressEvent: any) => {
            const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length')
            console.log('total', totalLength)
            if (totalLength) {
              uploadFile.progress = Math.round(progressEvent.loaded * 100 / totalLength)
              dispatch({
                type: CHANGE_UPLOAD_PROGRESS,
                payload: uploadFile
              })
            }
          }
        }
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

export const downloadFile = async (file: File) => {
  const res: any = await fetch(`api/files/download?id=${file._id}`,
    { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
  )
  if (res.status === 200) {
    const blob = await res.blob()
    const downloadUrl = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = downloadUrl
    link.download = file.name
    document.body.appendChild(link)
    link.click()
    link.remove()
  }
}

export const removeFile = (file: File) =>
  async (dispatch: Dispatch<FilesAction>) => {
    try {
      const { data } = await axios.delete(`api/files/remove?id=${file._id}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      )
      console.log(data)
      dispatch({
        type: REMOVE_FILE,
        payload: file._id
      })
    } catch (error) {
      console.log(error.responce)
    }
  }

export const searchFiles = (search: string) =>
  async (dispatch: Dispatch<FilesAction>) => {
    try {
      const { data } = await axios.get(`api/files/search?search=${search}`,
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

export const changePlate = (plate: number) =>
  (dispatch: Dispatch<FilesAction>) => {
    dispatch({
      type: CHANGE_PLATE,
      payload: plate
    })
  }
