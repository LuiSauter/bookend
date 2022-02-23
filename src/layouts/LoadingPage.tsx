import React from 'react'

export const LoadingPage = () => {
  return (
    <>
      <div className='dark:bg-primary bg-white text-textWhite grid place-content-center place-items-center min-h-screen w-screen'>
        <img
          src='/images/bookend-logo.png'
          alt='Bookend libros gratis'
          className='h-28 flex flex-shrink'
        />
      </div>
    </>
  )
}
