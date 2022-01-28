import React from 'react'

interface Props {
  children: JSX.Element | string
  color: string
  onClick?: () => void
}

export default function Button({ children, color, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`${
        color ? color : ''
      } transition-colors py-1 rounded-lg px-4 w-full`}
    >
      {children}
    </button>
  )
}