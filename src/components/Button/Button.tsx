import React from 'react'

interface Props {
  children: JSX.Element | JSX.Element[] | string;
  color: string;
  onClick: () => void;
}

export default function Button({ children, color, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="bg-gradient-to-r from-gray-500 to-black hover:from-gray-700 dark:from-purple-900 transition-colors dark:to-pink-900 text-white py-2 rounded-b-xl shadow-lg"
    >
      {children}
    </button>
  )
}