import React, { createContext, useState } from 'react'

interface IToggleContext {
  dropdownOpen: boolean
  handleToggleModal: () => void
  loginOpen: boolean
  handleLoginOpen: () => void
  editProfile: boolean
  handleEditProfile: () => void
  page: number
  handleCountPage: () => void
  showOptions: boolean
  handleOptions: () => void
}

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const ToggleContext = createContext<IToggleContext>(
  {} as IToggleContext
)

const INITIAL_PAGE = 6
export const ToggleStateProvider = ({ children }: Props) => {
  const [dropdownOpen, setToggleDropdown] = useState(false)
  const [loginOpen, setToggleLogin] = useState(false)
  const [editProfile, setEditProfile] = useState<boolean>(false)
  const [page, setPage] = useState(INITIAL_PAGE)
  const [showOptions, setShowOptions] = useState(false)

  const handleToggleModal = () => setToggleDropdown(!dropdownOpen)
  const handleLoginOpen = () => setToggleLogin(!loginOpen)
  const handleEditProfile = () => setEditProfile(!editProfile)
  const handleCountPage = () => setPage((prevPage) => prevPage + INITIAL_PAGE)
  const handleOptions = () => setShowOptions(!showOptions)
  return (
    <ToggleContext.Provider
      value={{
        dropdownOpen,
        handleToggleModal,
        loginOpen,
        handleLoginOpen,
        editProfile,
        handleEditProfile,
        page,
        handleCountPage,
        showOptions,
        handleOptions,
      }}
    >
      {children}
    </ToggleContext.Provider>
  )
}
