import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFiles, setCurrentDir } from '../../actions/files/files.actions'
import { RootState } from '../../reducers'
import CreateNewFilePopup from './components/Popup'
import FileList from './components/FileList'

import './Disk.scss'

const Disk = () => {
  const [showPopup, setShowPopup] = useState(false)
  const dispatch = useDispatch()
  const { currentDir, dirStack } = useSelector((state: RootState) => state.files)

  useEffect(() => {
    dispatch(getFiles(currentDir))
  }, [currentDir])

  const createNewFile = () => setShowPopup(true)
  const backClick = () => {
    const backDir = dirStack.pop() || null
    dispatch(setCurrentDir(backDir))
  }

  return (
    <section className='section'>
      <div className="disk">
        <div className="disk__btns">
          <button className="btn" onClick={backClick}>Назад</button>
          <button
            className="btn"
            onClick={createNewFile}
          >
            Создать папку
          </button>
        </div>
        <FileList />
      </div>
      {showPopup && <CreateNewFilePopup onClose={() => setShowPopup(false)} />}
    </section>
  )
}

export default Disk
