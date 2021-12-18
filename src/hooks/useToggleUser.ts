import { useContext } from 'react'
import { ToggleContext } from 'src/context/toggleModal/toggleContext'


export const useToggleUser = () => {
  const { dropdownOpen, handleToggleModal } = useContext(ToggleContext)
  return { dropdownOpen, handleToggleModal }
}