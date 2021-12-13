import React, { useState } from 'react'
import { LoginContext } from './LoginContext'

interface Props {
  children: JSX.Element | JSX.Element[];
}

const initialState = {
  isLogged: false,
}

export const LoginStateProvider = ({ children }: Props) => {
  const [state, setstate] = useState(initialState)
  return (
    <LoginContext.Provider value={{ isLogged: state.isLogged }}>
      {children}
    </LoginContext.Provider>
  )
}
