import React, { createContext, useState } from 'react'

interface IToggleContext {
  dropdownOpen: boolean;
  handleToggleModal: () => void;
  loginOpen: boolean;
  handleLoginOpen: () => void;
}

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const ToggleContext = createContext<IToggleContext>(
  {} as IToggleContext
)

export const ToggleStateProvider = ({ children }: Props) => {
  const [dropdownOpen, setToggleDropdown] = useState(false)
  const [loginOpen, setToggleLogin] = useState(false)
  const handleToggleModal = () => {
    setToggleDropdown(!dropdownOpen)
  }
  const handleLoginOpen = () => {
    setToggleLogin(!loginOpen)
  }
  return (
    <ToggleContext.Provider
      value={{ dropdownOpen, handleToggleModal, loginOpen, handleLoginOpen }}
    >
      {children}
    </ToggleContext.Provider>
  )
}
