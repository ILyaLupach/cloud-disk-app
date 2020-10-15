import React, { useState } from 'react'
import classnames from 'classnames'
import { signUpApi } from '../../../api/user'
import Input from '../../shared/Input'

import './SignUp.scss'

type InfoType = {
  message: string
  type: 'warning' | 'error' | 'completed' | ''
}

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [info, setInfo] = useState<InfoType>({ message: '', type: '' })
  const [isSending, setSending] = useState(false)


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSending(true)
    const { data, error } = await signUpApi(email, password)
    setSending(false)
    if (error) {
      setInfo({ message: error, type: 'error' })
      return
    }
    setInfo({ message: data?.message, type: 'completed' })
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfo({ message: '', type: '' })
    if (!e.target?.name) return
    switch (e.target.name) {
      case 'name':
        setName(e.target.value)
        break
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
    <section className='section-wrapper'>
      <form className='signup' onSubmit={handleSubmit}>
        <div className='signup__header'>
          Регистрация
      </div>
        <Input
          type='text'
          name='email'
          placeholder='Электронная почта'
          className='signup__input'
          value={email}
          onChange={handleChange}
        />
        <Input
          type='password'
          name='password'
          placeholder='Пароль'
          className='signup__input'
          value={password}
          onChange={handleChange}
        />
        <Input
          type='text'
          name='name'
          placeholder='Юзернейм'
          className='signup__input'
          value={name}
          onChange={handleChange}
        />
        <div className="signup__wrapper">
          {info.message && (
            <span className={classnames(
              'signup__status',
              info.type === 'warning' && 'signup__status_orange',
              info.type === 'error' && 'signup__status_red',
              info.type === 'completed' && 'signup__status_green',
            )}>
              {info.message}
            </span>
          )}
          <button
            className='signup__btn'
            disabled={!email || !password || isSending}
          >
            Зарегистрироваться
          </button>
        </div>
      </form>
    </section>
  )
}

export default SignUp
