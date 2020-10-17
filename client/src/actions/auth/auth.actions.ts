import axios, { AxiosResponse } from 'axios'

import { Dispatch } from 'redux';
import { User } from '../../types/User';
import { LOGOUT, SET_USER, UserAction } from './types';

interface Response extends AxiosResponse {
  data: {
    user: User
    token: string
  }
}

export const signUp = async (email: string, password: string) => {
  try {
    const { data }: Response = await axios.post(
      '/api/auth/signup', {
      email,
      password,
    })
    console.log(data)
  } catch (error) {
    console.log(error.response.data)
  }
}

export const login = (email: string, password: string) =>
  async (dispatch: Dispatch<UserAction>) => {
    try {
      const res: Response = await axios.post(
        '/api/auth/login', {
        email,
        password,
      })
      dispatch({
        type: SET_USER,
        payload: res.data.user
      })
      localStorage.setItem('token', res.data.token)
    } catch (error) {
      console.log(error.response.data)
    }
  }

export const logOut = () => (dispatch: Dispatch<UserAction>) => {
  localStorage.removeItem('token')
  dispatch({ type: LOGOUT })
}

export const auth = () =>
  async (dispatch: Dispatch<UserAction>) => {
    try {
      const response = await axios.get('api/auth/auth',
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      )
      dispatch({
        type: SET_USER,
        payload: response.data.user
      })
      localStorage.setItem('token', response.data.token)
    } catch (error) {}
  }
