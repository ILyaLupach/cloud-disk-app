import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFiles } from '../../actions/files/files.actions'
import { RootState } from '../../reducers'
import FileList from './components/FileList'

import './Disk.scss'

const Disk = () => {
  const dispatch = useDispatch()
  const { currentDir } = useSelector((state: RootState) => state.files)

  useEffect(() => {
    dispatch(getFiles(currentDir))
  }, [currentDir])

  return (
    <section className='section'>
      <div className="disk">
        <div className="disk__btns">
          <button className="btn">Назад</button>
          <button className="btn">Создать папку</button>
        </div>
        <FileList />
      </div>
    </section>
  )
}

export default Disk
