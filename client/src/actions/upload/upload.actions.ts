import { Dispatch } from 'redux'
import { REMOVE_UPLOAD_FILE, SHOW_UPLOADER, UploadAction } from './types'

export const showUploader = () => (dispatch: Dispatch<UploadAction>) => {
  dispatch({
    type: SHOW_UPLOADER,
    payload: true
  })
}

export const hideUploader = () => (dispatch: Dispatch<UploadAction>) => {
  dispatch({
    type: SHOW_UPLOADER,
    payload: false
  })
}

export const removeUploadFile = (id: number) => (dispatch: Dispatch<UploadAction>) => {
  dispatch({
    type: REMOVE_UPLOAD_FILE,
    payload: id
  })
}
