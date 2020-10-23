import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { auth } from '../actions/auth/auth.actions'
import NavBar from './Navbar'
import SignUp from './Auth/SignUp'
import Login from './Auth/Login'

import { RootState } from '../reducers'

import '../assets/styles/global.scss'
import Disk from './Disk'

export const App = () => {
  const { isGuest } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(auth())
  }, [])

  return (
    <BrowserRouter>
      <NavBar />
      {isGuest ? (
        <Switch>
          <Route path='/signup' component={SignUp} />
          <Route path='/login' component={Login} />
          <Redirect to='/login' />
        </Switch>
      ) : (
        <Switch>
          <Route exact path='/disk' component={Disk} />
          <Redirect to='/disk'/>
        </Switch>
      )}
    </BrowserRouter>
  )
}

export default App
