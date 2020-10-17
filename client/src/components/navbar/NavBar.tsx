import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { logOut } from '../../actions/auth/auth.actions'
import FolderIcon from '../../assets/images/folders.svg'

import { RootState } from '../../reducers'

import './NavBar.scss'

const NavBar = () => {
  const { isGuest } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()
  const onLogOut = () => {
    dispatch(logOut())
  }
  return (
    <nav className='navbar'>
      <div className='navbar__container'>
        <img src={FolderIcon} className='navbar__logo' />
        <div className='navbar__title'>Cloud Disk</div>
        {!isGuest ? (
          <button className='btn' onClick={onLogOut}>
            Выйти
          </button>
        ) : (
          <Fragment>
            <NavLink to='/login' className='btn'>Вход</NavLink>
            <NavLink to='/signup' className='btn'>Регистрация</NavLink>
          </Fragment>
        )}
      </div>
    </nav>
  )
}

export default NavBar
