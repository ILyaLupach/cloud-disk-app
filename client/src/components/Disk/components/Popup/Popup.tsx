import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createDir } from '../../../../actions/files/files.actions'
import { RootState } from '../../../../reducers'
import Input from '../../../shared/Input'

import './Popup.scss'

type Props = {
  onClose: () => void
}

const Popup = ({ onClose }: Props) => {
  const [text, setText] = useState('')
  const { currentDir } = useSelector((state: RootState) => state.files)

  const dispatch = useDispatch()

  const createNewFile = () => {
    dispatch(createDir(currentDir, text, 'dir'))
    onClose()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  return (
    <div className='popup'>
      <div className='popup__container'>
        <div className='popup__header'>
          Введите название папки
      </div>
        <Input
          type='text'
          placeholder='Новая папка'
          className='popup__input'
          value={text}
          onChange={handleChange}
        />
        <div className="popup__wrapper">
          <button className='btn' onClick={onClose}>Закрыть</button>
          <button className='btn' onClick={createNewFile}>Создать</button>
        </div>
      </div>
    </div>
  )
}

export default Popup
