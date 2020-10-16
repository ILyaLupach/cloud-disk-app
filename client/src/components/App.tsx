import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { auth } from '../actions/auth/auth.actions'
import NavBar from './Navbar'
import SignUp from './Auth/SignUp'
import Login from './Auth/Login'

import { RootState } from '../reducers'

import '../assets/styles/global.scss'

export const App = () => {
  const { isGuest } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(auth())
  }, [])

  return (
    <BrowserRouter>
      <NavBar />
      {isGuest && (
        <Switch>
          <Route path='/signup' component={SignUp} />
          <Route path='/login' component={Login} />
        </Switch>
      )}
    </BrowserRouter>
  )
}

export default App
