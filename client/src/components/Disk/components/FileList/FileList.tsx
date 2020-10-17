import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../reducers'
import { FileStateType } from '../../../../reducers/files.reducer'
import File from '../File'

import './FileList.scss'

const FileList = () => {
  const { files } = useSelector((state: RootState) => state.files)
  return (
    <div className='file-list'>
      <div className="file-list__header">
        <div className="file-list__name">Название</div>
        <div className="file-list__data">Дата</div>
        <div className="file-list__size">Размер</div>
      </div>
      {files.map((file) => <File key={file._id} file={file}/>)}
    </div>
  )
}

export default FileList
