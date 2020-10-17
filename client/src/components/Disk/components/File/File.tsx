import React from 'react'
import moment from 'moment'
import { File as FileType } from '../../../../types/File'
import FolderIcon from '../../../../assets/images/folder.svg'
import FileIcon from '../../../../assets/images/file.svg'

import './File.scss'

type Props = {
  file: FileType
}

const File = ({ file }: Props) => {
  const date = moment(file.date).format('DD.MM.YYYY')
  return (
    <div className='file'>
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
