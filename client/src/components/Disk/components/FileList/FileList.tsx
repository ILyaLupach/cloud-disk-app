import React from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
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
      <TransitionGroup>
        {files.map((file) => (
          <CSSTransition
            key={file._id}
            timeout={300}
            classNames='file'
            exit={false}
          >
            <File file={file} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  )
}

export default FileList
