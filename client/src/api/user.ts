import axios, { AxiosResponse } from 'axios'

interface Response extends AxiosResponse {
  message: any
}

export const signUpApi = async (email: string, password: string, name?: string) => {
  try {
    const { data }: Response = await axios.post('/api/auth/signup', {
      email,
      password,
    })
    return { data }

  } catch (error) {
    console.error('error', error);
    return { error: error.response.data?.message }
  }
}
