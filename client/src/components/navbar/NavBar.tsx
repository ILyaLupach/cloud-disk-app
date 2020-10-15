import React from 'react'
import { NavLink } from 'react-router-dom'
import FolderIcon from '../../assets/images/folder.svg'

import './NavBar.scss'

const NavBar = () => (
  <nav className='navbar'>
    <div className='navbar__container'>
      <img src={FolderIcon} className='navbar__logo' />
      <div className='navbar__title'>Cloud Disk</div>
      <NavLink to='/login' className='navbar__login'>Войти</NavLink>
      <NavLink to='/signup' className='navbar__signup'>Регистрация</NavLink>
    </div>
  </nav>
)

export default NavBar
