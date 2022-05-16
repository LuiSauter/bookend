import React from 'react'
import Image from 'next/image'

const Notfound = () => {
  return (
    <div className='h-full w-full p-6 rounded-xl'>
      <h1 className='w-full text-center font-bold text-4xl text-fourth pb-6'>
        Page 404 Not Found
      </h1>
      <figure className='w-full h-96 mx-auto relative px-4'>
        <Image
          src='/images/page-not-found.svg'
          alt='bookend 404 page not found'
          className='w-full object-cover'
          layout='fill'
        />
      </figure>
    </div>
  )
}
export default Notfound