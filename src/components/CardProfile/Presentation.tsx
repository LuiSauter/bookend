import Image from 'next/image'
import React from 'react'
import welcomeImg from 'public/images/welcome-book.svg'

const Presentation = () => {
  return (
    <div className='dark:bg-secondary bg-slate-200 border border-textGray/10 rounded-xl mb-4 w-full p-4 flex flex-col justify-center relative gap-2 select-none'>
      <h2 className='text-lg font-semibold animate-pulse dark:text-slate-400 text-slate-700'>
        Find a book and have fun : ).
      </h2>
      <figure className='w-full h-48 relative overflow-hidden'>
        <Image layout='fill' src={welcomeImg} priority={true} />
      </figure>
    </div>
  )
}

export default Presentation