import React, { ButtonHTMLAttributes } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { downloadFile, pushToStack, removeFile, setCurrentDir } from '../../../../actions/files/files.actions'
import moment from 'moment'
import { File as FileType } from '../../../../types/File'
import FolderIcon from '../../../../assets/images/folder.svg'
import FileIcon from '../../../../assets/images/file.svg'
import { RootState } from '../../../../reducers'

import './File.scss'

type Props = {
  file: FileType
}

const File = ({ file }: Props) => {
  const { currentDir } = useSelector((state: RootState) => state.files)
  const dispatch = useDispatch()
  const date = moment(file.date).format('DD.MM.YYYY')

  const openDir = () => {
    dispatch(pushToStack(currentDir))
    dispatch(setCurrentDir(file._id))
  }

  const downloadClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    downloadFile(file)
  }
  const removeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    dispatch(removeFile(file))
  }

  return (
    <div className='file' onClick={file.type === 'dir' ? openDir : undefined}>
      <img
        src={file.type === 'dir' ? FolderIcon : FileIcon}
        alt={file.name}
        className="file__img"
      />
      <div className="file__name">{file.name}</div>
      {file.type !== 'dir' && (
        <button
          className='file__download'
          onClick={downloadClick}
        >
          скачать
        </button>
      )}
      <button
        className='file__remove'
        onClick={removeClick}
      >
        удалить
      </button>
      <div className="file__data">{date}</div>
      <div className="file__size">{file.size}</div>
    </div>
  )
}

export default File
