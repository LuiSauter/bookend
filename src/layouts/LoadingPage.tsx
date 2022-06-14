import React from 'react'

export const LoadingPage = () => {

  return (
    <div className='bg-primary absolute inset-0 z-[100] text-textWhite grid place-content-center place-items-center h-screen w-screen overflow-hidden'>
      <figure className='h-[100px] w-[130px] flex flex-shrink relative'>
        <img src='/images/bookend-logo.png' alt='Bookend libros asombrosos' />
      </figure>
    </div>
  )
}
