import { useContext } from 'react'
import { UserContext } from 'src/context/User/UserContext'

export const useStaticUsers = () => {
  const { addUsers, userState } = useContext(UserContext)
  return { addUsers, userState }
}