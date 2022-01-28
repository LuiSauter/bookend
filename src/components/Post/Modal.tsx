import React, { useEffect, useState } from 'react'

interface Props {
  title: string
  description: string[] | undefined
  hoverInfo: boolean
  author: string | undefined
}

const Modal = ({ description, title, hoverInfo, author }: Props) => {
  const [hoverModal, setHoverModal] = useState(false)
  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      if (hoverInfo) {
        setHoverModal(true)
      }
    }

    return () => {
      cleanup = false
    }
  }, [hoverInfo])

  return (
    <div
      className={`${
        hoverModal ? 'scale-105' : 'scale-0'
      } hidden lg:flex flex-col cursor-default transition-all absolute bottom-20 translate-x-1/2 rounded-xl w-60 p-3 z-50 shadow-2xl shadow-blue-500/30`}
    >
      <div className='bg-secondaryHover/70 backdrop-blur-md w-full h-full absolute inset-0 rounded-xl'></div>
      <span className='font-semibold z-10 text-teal-50'>{title}</span>
      <div className='text-sm flex flex-col leading-relaxed z-10 gap-y-1'>
        <span className='text-slate-400'>{description}</span>
        <p>
          <span className='font-semibold text-teal-50'>Autor: </span>
          <span className='text-thirdBlue'>{author}</span>
        </p>
      </div>
    </div>
  )
}

export default Modal
