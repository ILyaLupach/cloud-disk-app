import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hideUploader, removeUploadFile } from '../../../actions/upload/upload.actions'
import { RootState } from '../../../reducers'

import './UpLoader.scss'

const UpLoader = () => {
  const { files } = useSelector((state: RootState) => state.upload)
  const dispatch = useDispatch()

  const onHideUploader = () => {
    dispatch(hideUploader())
  }

  useEffect(() => {
    !files.length && onHideUploader()
  }, [files])

  const onRemoveUploadFile = (id: number) => {
    dispatch(removeUploadFile(id))
  }

  return (
    <div className='uploader'>
      <div className="uploader__header">
        <div className="uploader__title">Загрузка</div>
        <button
          className="uploader__close"
          onClick={onHideUploader}
        >
          X
        </button>
      </div>
      {files.map((file, i) => (
        <div className='upload-file' key={i}>
          <div className="upload-file__header">
            <div className='upload-file__name'>{file.name}</div>
            <button
              className="upload-file__remove"
              onClick={() => onRemoveUploadFile(file.id)}
            >
              X
            </button>
          </div>
          <div className="upload-file__progress-bar">
            <div
              className="upload-file__upload-bar"
              style={{ width: `${file.progress}%` }}
            />
            <div className="upload-file__percent">{file.progress} %</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default UpLoader
