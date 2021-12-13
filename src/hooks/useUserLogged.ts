import { useContext } from 'react'
import { LoginContext } from 'src/context/LoginContext'



export const useUserLogged = () => {
  const { isLogged } = useContext(LoginContext)
  console.log(isLogged)
  return { isLogged }
}