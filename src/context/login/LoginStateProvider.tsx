import React, { useEffect, useState } from 'react'
import { LoginContext } from './LoginContext'

interface Props {
  children: JSX.Element | JSX.Element[];
}

const initialState = {
  profile: '',
}

interface IProfileId {
  profile: string;
}

export const LoginStateProvider = ({ children }: Props) => {
  const [state, setstate] = useState<IProfileId>(initialState)

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      if (state.profile === '') {
        console.log('holis')
        if (typeof window !== 'undefined') {
          const getDataStorage = localStorage.getItem('profileId') || ''
          setstate({ profile: getDataStorage })
        }
      }
    }
    return () => {
      cleanup = false
    }
  }, [])

  const setProfileId = (profileId: string) => {
    return setstate({ profile: profileId })
  }

  return (
    <LoginContext.Provider
      value={{
        profile: state.profile,
        setProfileId,
      }}
    >
      {children}
    </LoginContext.Provider>
  )
}
