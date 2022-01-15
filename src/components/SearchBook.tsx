import React, { FormEvent, useState } from 'react'
import * as icons from 'src/assets/icons'

const SearchBook = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('searhBook')
  }
  return (
    <>
      <form onSubmit={handleSubmit} className='w-full h-full'>
        <label className='flex items-center focus-within:bg-secondary transition-colors focus-within:text-thirdBlue gap-2 px-4 py-2 rounded-2xl'>
          <span className='opacity-50'>{icons.searchIcon}</span>
          <input
            className='bg-transparent outline-none w-full text-white'
            type='text'
            placeholder='Search in Bookend'
          />
        </label>
      </form>
    </>
  )
}

export default SearchBook