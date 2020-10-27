import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { logOut } from '../../actions/auth/auth.actions'
import { getFiles, searchFiles } from '../../actions/files/files.actions'
import FolderIcon from '../../assets/images/folders.svg'
import DefaultAvatar from '../../assets/images/defaultAvatar.svg'

import { RootState } from '../../reducers'

import './NavBar.scss'

const NavBar = () => {
  const { isGuest } = useSelector((state: RootState) => state.user)
  const [search, setSearch] = useState('')
  const [debounce, setDebounce] = useState<any>(null)

  const { currentDir } = useSelector((state: RootState) => state.files)
  const { currentUser } = useSelector((state: RootState) => state.user)

  const dispatch = useDispatch()
  //нужно подправить апи для статики
  const avatar = currentUser?.avatar
  ? `http://localhost:8080/${currentUser.avatar}`
  : DefaultAvatar

  useEffect(() => {
    if (search === '') dispatch(getFiles(currentDir))
  }, [search])

  const onLogOut = () => {
    dispatch(logOut())
  }
  const changeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    if (debounce != false) {
      clearTimeout(debounce)
    }
    if (e.target.value !== '') {
      setDebounce(setTimeout((value) => {
        dispatch(searchFiles(value));
      }, 500, e.target.value))
    }
  }

  return (
    <nav className='navbar'>
      <div className='navbar__container'>
        <Link to='/disk'>
          <img src={FolderIcon} className='navbar__logo' />
        </Link>
        <Link to='/disk'><div className='navbar__title'>Cloud Disk</div></Link>
        {!isGuest ? (
          <React.Fragment>
            <input
              type="text"
              className="navbar__search"
              placeholder='поиск...'
              value={search}
              onChange={changeSearch}
            />
            <button className='btn' onClick={onLogOut}>
              Выйти
            </button>
            <NavLink to='/profile'>
              <img className='navbar__avatar' src={avatar} alt='avatar' />
            </NavLink>
          </React.Fragment>
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
