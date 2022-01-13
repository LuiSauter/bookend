import React from 'react'
import { useToggleUser } from 'src/hooks/useToggleUser'
import Button from '../Button/Button'


const PostOptions = () => {
  const { handleOptions } = useToggleUser()
  return (
    <div className='fixed inset-0 w-full h-full grid place-content-center place-items-center z-[50]'>
      <div className='bg-secondary rounded-xl p-4 flex flex-col w-[60vw] h-min z-[60] transition-all sm:w-80'>
        <Button onClick={handleOptions} color={'hover:bg-secondaryLigth'}>
          Share
        </Button>
        <Button onClick={handleOptions} color={'hover:bg-secondaryLigth'}>
          Edit
        </Button>
        <Button onClick={handleOptions} color={'bg-red-400 hover:bg-red-500'}>
          Cancel
        </Button>
      </div>
      <div
        onClick={handleOptions}
        className='fixed top-0 left-0 right-0 bg-black/40 transition-all h-screen w-full z-[50]'
      />
    </div>
  )
}

export default PostOptions
