import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../reducers'
import DefaultAvatar from '@assets/images/defaultAvatar.svg'
import { removeAvatar, uploadAvatar } from '../../../../actions/auth/auth.actions'

import './Profile.scss'

const Profile = () => {
  const { currentUser } = useSelector((state: RootState) => state.user)
    //нужно подправить апи для статики
  const avatar = currentUser?.avatar
    ? `http://localhost:8080/${currentUser.avatar}`
    : DefaultAvatar
  const dispatch = useDispatch()

  const onRemoveAvatar = () => {
    dispatch(removeAvatar())
  }

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = [...e.currentTarget.files]
    if (!files.length) return
    dispatch(uploadAvatar(files[0]))
  }

  return (
    <section className='section'>
      <div className='profile'>
        <img src={avatar} alt='avatar' />
        <div className='profile__btns'>
          <button className="btn" onClick={onRemoveAvatar}>Удалить аватар</button>
          <input
            accept='image/*'
            type="file"
            className='navbar__search'
            placeholder='загрузить аватар'
            onChange={onChangeHandler}
          />
        </div>
      </div>
    </section>
  )
}

export default Profile
