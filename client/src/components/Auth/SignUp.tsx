import React, { useState } from 'react'
import { signUp } from '../../actions/auth/auth.actions'
import Input from '../shared/Input'

import './Auth.scss'

type InfoType = {
  message: string
  type: 'warning' | 'error' | 'completed' | ''
}

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    signUp(email, password)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target?.name) return
    switch (e.target.name) {
      case 'email':
        setEmail(e.target.value)
        break
      case 'password':
        setPassword(e.target.value)
        break
      default:
        break
    }
  }

  return (
    <section className='section'>
      <form className='auth' onSubmit={handleSubmit}>
        <div className='auth__header'>
          Регистрация
      </div>
        <Input
          type='text'
          name='email'
          placeholder='Электронная почта'
          className='auth__input'
          value={email}
          onChange={handleChange}
        />
        <Input
          type='password'
          name='password'
          placeholder='Пароль'
          className='auth__input'
          value={password}
          onChange={handleChange}
        />
        <div className="auth__wrapper">
          <button
            className='btn'
            disabled={!email || !password}
          >
            Зарегистрироваться
          </button>
        </div>
      </form>
    </section>
  )
}

export default SignUp
