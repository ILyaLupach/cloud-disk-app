import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { pushToStack, setCurrentDir } from '../../../../actions/files/files.actions'
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

  return (
    <div className='file' onClick={file.type === 'dir' ? openDir : undefined}>
      <img
        src={file.type === 'dir' ? FolderIcon : FileIcon}
        alt={file.name}
        className="file__img"
      />
      <div className="file__name">{file.name}</div>
      <div className="file__data">{date}</div>
      <div className="file__size">{file.size}</div>
    </div>
  )
}

export default File
