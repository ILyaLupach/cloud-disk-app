import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFiles, setCurrentDir, uploadDFile } from '../../actions/files/files.actions'
import { RootState } from '../../reducers'
import CreateNewFilePopup from './components/Popup'
import FileList from './components/FileList'

import './Disk.scss'
import UpLoader from '../shared/UpLoader'
import { SHOW_UPLOADER } from '../../actions/upload/types'

const Disk = () => {
  const [showPopup, setShowPopup] = useState(false)
  const [dragEnter, setDragEnter] = useState(false)
  const dispatch = useDispatch()
  const { currentDir, dirStack } = useSelector((state: RootState) => state.files)
  const { isVisible } = useSelector((state: RootState) => state.upload)

  useEffect(() => {
    dispatch(getFiles(currentDir))
  }, [currentDir])

  const createNewDir = () => setShowPopup(true)

  //TODO fix type any
  const uploadNewFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = [...e.currentTarget.files]
    files.forEach(file => dispatch(uploadDFile(file, currentDir)))
  }
  const backClick = () => {
    const backDir = dirStack.pop() || null
    dispatch(setCurrentDir(backDir))
  }

  const onDragEnterHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragEnter(true)
  }
  const onDragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragEnter(false)
  }
  const onDropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const files = [...e.dataTransfer.files]
    files.forEach(file => dispatch(uploadDFile(file, currentDir)))
    setDragEnter(false)
  }

  if (dragEnter) {
    return (
      <section className='section'>
        <div
          className="drop-area"
          onDragEnter={onDragEnterHandler}
          onDragLeave={onDragLeaveHandler}
          onDragOver={onDragEnterHandler}
          onDrop={onDropHandler}
        >
          Перетащите файлы в окно
      </div>
      </section>
    )
  }

  return (
    <section className='section'>
      <div
        className="disk"
        onDragEnter={onDragEnterHandler}
        onDragLeave={onDragLeaveHandler}
        onDragOver={onDragEnterHandler}
      >
        <div className="disk__btns">
          <button className="btn" onClick={backClick}>Назад</button>
          <button
            className="btn"
            onClick={createNewDir}
          >
            Создать папку
          </button>
          <label className="btn">
            Загрузить файл
            <input
              id='disk-upload'
              type="file"
              className="disk__upload-input"
              style={{ display: 'none' }}
              onChange={(e) => uploadNewFile(e)}
              multiple
            />
          </label>
        </div>
        <FileList />
      </div>
      {showPopup && <CreateNewFilePopup onClose={() => setShowPopup(false)} />}
      {isVisible && <UpLoader />}
    </section>
  )
}

export default Disk
