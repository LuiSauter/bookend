import { useContext } from 'react'
import { ToggleContext } from 'src/context/toggleModal/toggleContext'


export const useToggleUser = () => {
  const {
    dropdownOpen,
    handleToggleModal,
    loginOpen,
    handleLoginOpen,
    editProfile,
    handleEditProfile,
    page,
    handleCountPage,
  } = useContext(ToggleContext)
  return {
    dropdownOpen,
    handleToggleModal,
    loginOpen,
    handleLoginOpen,
    editProfile,
    handleEditProfile,
    page,
    handleCountPage,
  }
}