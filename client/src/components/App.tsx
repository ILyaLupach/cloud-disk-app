import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import NavBar from './navbar'
import SignUp from './auth/signUp'
import Login from './auth/login'

import '../assets/styles/global.scss'

export const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
        <Switch>
          <Route path='/signup' component={SignUp} />
          <Route path='/login' component={Login} />
        </Switch>
    </BrowserRouter>
  )
}

export default App
