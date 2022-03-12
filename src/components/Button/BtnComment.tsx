import React, { useState } from 'react'

interface Props {
  comments?: number | undefined
  bgColor?: string
  textColor?: string
  title?: string
  children: JSX.Element | JSX.Element[]
  onClick?: () => void
}

const BtnComment = ({ comments, bgColor, textColor, children, title, onClick }: Props) => {
  const [showHover, setShowHover] = useState(false)
  return (
    <div
      onClick={(event) => {
        event.stopPropagation()
        onClick && onClick()
      }}
      className={`flex items-center gap-1 ${textColor} contrast-125 font-semibold`}
      onMouseEnter={() => setShowHover(true)}
      onMouseLeave={() => setShowHover(false)}
      title={title}
    >
      <button
        className={`${
          showHover ? bgColor : 'bg-transparent'
        } rounded-full h-9 w-9 transition-all grid place-content-center place-items-center`}
      >
        {children}
      </button>
      {comments && <span className='transition-all font-semibold'>{comments}</span>}
    </div>
  )
}

export default BtnComment