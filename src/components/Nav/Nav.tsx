import React from 'react'

interface Props {
  children: JSX.Element | JSX.Element[];
  visible: string;
}

export const Nav = ({ children, visible }: Props) => {
  return (
    <div
      className={`${visible} items-center justify-center w-full h-12 hover:bg-secondaryHover transition-colors sm:h-12 sm:w-12 sm:rounded-full md:h-8 md:w-8 md:hover:rounded-3xl md:mr-4`}
    >
      {children}
    </div>
  )
}
