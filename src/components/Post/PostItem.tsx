import React, { useEffect, useState } from 'react'
import * as icons from 'src/assets/icons'
import Modal from './Modal'

const PostItem = ({ image, title, description }: Post) => {
  const [hoverInfo, setHoverInfo] = useState(false)
  return (
    <article
      className="w-full flex flex-col gap-2 transition-all relative hover:text-thirdBlue"
      onMouseEnter={() => setHoverInfo(true)}
      onMouseLeave={() => {
        setHoverInfo(false)
      }}
    >
      <figure className="relative m-0 overflow-hidden w-full aspect-[160/230] rounded-xl ">
        <div
          className={`${
            hoverInfo ? 'opacity-100' : 'opacity-0'
          } absolute transition-all cursor-pointer w-full bg-black/30 h-full`}
        >
          <div
            className={`${
              hoverInfo ? 'scale-150' : 'scale-0'
            } absolute transition-all top-[50%] left-[40%] text-teal-50`}
          >
            {icons.book}
          </div>
        </div>
        <img
          className="object-fill h-full w-full rounded-lg"
          src={image}
          alt={title}
        />
      </figure>
      <h2 className="text-sm text-center">{title} asasdsad</h2>
      {hoverInfo && ( //translate-x-1/3
        <Modal title={title} description={description} hoverInfo={hoverInfo} />
      )}
    </article>
    // auto 160 / 242
  )
}

export default PostItem
