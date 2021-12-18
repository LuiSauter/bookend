import React, { createContext, useState } from 'react'

interface IToggleContext {
  dropdownOpen: boolean;
  handleToggleModal: () => void;
}

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const ToggleContext = createContext<IToggleContext>(
  {} as IToggleContext
)

export const ToggleStateProvider = ({ children }: Props) => {
  const [dropdownOpen, setToggleDropdown] = useState(false)
  const handleToggleModal = () => {
    setToggleDropdown(!dropdownOpen)
  }
  return (
    <ToggleContext.Provider value={{ dropdownOpen, handleToggleModal }}>
      {children}
    </ToggleContext.Provider>
  )
}
