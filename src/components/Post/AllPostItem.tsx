import React, { useState } from 'react'
import * as icons from 'src/assets/icons'
import BtnLike from '../Button/BtnLike'
import PhotoUser from '../User/PhotoUser'
import Modal from './Modal'

const AllPostItem = ({ image, title, description, author, id, likes }: Post) => {
  const [hoverInfo, setHoverInfo] = useState(false)
  return (
    <article
      className='w-full flex flex-col gap-2 transition-all text-slate-300 relative cursor-pointer hover:text-thirdBlue rounded-xl'
      onMouseEnter={() => setHoverInfo(true)}
      onMouseLeave={() => setHoverInfo(false)}
    >
      <div className='relative m-0 overflow-hidden w-full h-full aspect-[160/230] rounded-xl '>
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
        <figure>
          <PhotoUser
            nameAlt={title}
            photoURL={image}
            styles='h-auto'
            placeholder={true}
          />
        </figure>
      </div>
      <div className='flex flex-row justify-between items-center transform scale-90'>
        <h2 className='dark:text-thirdBlue text-black'>{title}</h2>
        <BtnLike id={id} likes={likes ? likes?.length : 0} />
      </div>
      {hoverInfo && (
        <Modal
          title={title}
          description={description}
          author={author}
          hoverInfo={hoverInfo}
        />
      )}
    </article>
  )
}

export default AllPostItem
