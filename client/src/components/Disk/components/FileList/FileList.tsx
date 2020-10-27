import React from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../reducers'
import { FileStateType } from '../../../../reducers/files.reducer'
import File from '../File'

import './FileList.scss'

const FileList = () => {
  const { files, plate } = useSelector((state: RootState) => state.files)

  if (!files.length) return <h4 className='file-list__not-found'>Файлы не найдены</h4>

  switch (plate) {
    case 1:
      return (
        <div className='file-list file-list_plate-1'>
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
    case 2:
      return (
        <div className='file-list file-list_plate-2'>
            {files.map((file) => <File key={file._id} file={file} />)}
        </div>
      )
    default:
      return null;
  }
}

export default FileList
