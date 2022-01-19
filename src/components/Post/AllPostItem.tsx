import React, { useState } from 'react'
import * as icons from 'src/assets/icons'
import Modal from './Modal'

const AllPostItem = ({ image, title, description }: Post) => {
  const [hoverInfo, setHoverInfo] = useState(false)
  return (
    <article
      className='w-full flex flex-col gap-2 transition-all text-slate-300 relative cursor-pointer hover:text-thirdBlue rounded-xl'
      onMouseEnter={() => setHoverInfo(true)}
      onMouseLeave={() => {
        setHoverInfo(false)
      }}
    >
      <figure className='relative m-0 overflow-hidden w-full h-full bg-red-500 aspect-[160/230] rounded-xl '>
        <div
          className={`${
            hoverInfo ? 'opacity-100' : 'opacity-0'
          } absolute transition-all inset-0 z-[1] cursor-pointer w-full bg-black/40 h-full`}
        >
          <div
            className={`${
              hoverInfo ? 'scale-150' : 'scale-0'
            } grid place-content-center place-items-center h-full w-full transition-all z-[1] text-teal-50`}
          >
            {icons.book}
          </div>
        </div>
        <img
          className='object-cover h-full w-full absolute object-center rounded-lg'
          src={image}
          alt={title}
        />
      </figure>
      <h2 className='text-sm text-center'>{title}</h2>
      {hoverInfo && ( //translate-x-1/3
        <Modal title={title} description={description} hoverInfo={hoverInfo} />
      )}
    </article>
  )
}

export default AllPostItem
