import Image from 'next/image'
import React from 'react'

export const LoadingPage = () => {
  return (
    <>
      <div className='dark:bg-primary bg-white text-textWhite grid place-content-center place-items-center min-h-screen w-screen'>
        <figure className='h-28 flex flex-shrink relative'>
          <Image
            src='/images/bookend-logo.png'
            alt='Bookend libros gratis'
            layout='fill'
          />
        </figure>
      </div>
    </>
  )
}
