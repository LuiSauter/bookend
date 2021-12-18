import { useContext } from 'react'
import { LoginContext } from 'src/context/login/LoginContext'

export const useProfileId = () => {
  const { profile, setProfileId } = useContext(LoginContext)
  return { profile, setProfileId }
}