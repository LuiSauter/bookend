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
      } hidden lg:flex flex-col cursor-default transition-all absolute bottom-20 translate-x-1/2 rounded-xl w-60 p-3 z-[70] shadow-2xl dark:shadow-blue-500/30 shadow-blue-500/90`}
    >
      <div className='dark:bg-secondaryHover/70 bg-slate-200/60 backdrop-blur-md w-full h-full absolute inset-0 rounded-xl'></div>
      <span className='font-semibold z-10 dark:text-teal-50 text-black/90'>
        {title}
      </span>
      <div className='text-sm flex flex-col leading-relaxed z-10 gap-y-1'>
        <span className='dark:text-slate-400 text-black/90'>
          {description && description.join(' ').length < 250
            ? description.join('\n')
            : `${description?.join('\n').toString().substring(0, 250)}...`}
        </span>
        <p>
          <span className='font-semibold dark:text-teal-50 text-black/90'>
            Autor:{' '}
          </span>
          <span className='text-thirdBlue font-semibold'>{author}</span>
        </p>
      </div>
    </div>
  )
}

export default Modal
