import React, { useEffect, useState } from 'react'

interface Props {
  title: string;
  description: string[] | undefined;
  hoverInfo: boolean;
}

const Modal = ({ description, title, hoverInfo }: Props) => {
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
      } hidden lg:flex flex-col transition-all absolute bottom-20 translate-x-1/3 rounded-xl w-60 p-3  z-20 shadow-lg shadow-blue-500/30`}
    >
      <div className="bg-secondaryHover/70 backdrop-blur-md w-full h-full absolute inset-0 rounded-xl"></div>
      <span className="font-semibold z-10 text-teal-50">{title}</span>
      <div className="text-sm flex flex-col leading-relaxed z-10 gap-y-1">
        <span className="text-slate-400">{description && description[0]}</span>
        <p>
          <span className="font-semibold text-teal-50">Autor: </span>
          <span className="text-thirdBlue">
            {description && description[1]}
          </span>
        </p>
      </div>
    </div>
  )
}

export default Modal
