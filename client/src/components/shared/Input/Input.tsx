import React from 'react'

import './Input.scss'

export type Props = {
  type?: string
  name?: string
  placeholder?: string
  className?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = (props: Props) => (
  <input {...props} />
)

export default Input
