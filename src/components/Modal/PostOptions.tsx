import { useRouter } from 'next/router'
import React from 'react'
import Button from '../Button/Button'

interface Props {
  id: string | undefined
  toggleOptions?: () => void
}


const PostOptions = ({ id, toggleOptions }: Props) => {
  const router = useRouter()

  return (
    <div className='fixed inset-0 w-full h-full grid place-content-center place-items-center z-[80]'>
      <div className='bg-secondary rounded-xl p-4 flex flex-col w-[60vw] h-min z-[90] transition-all sm:w-80'>
        <Button
          onClick={() => console.log('button not available')}
          color={'hover:bg-secondaryLigth'}
        >
          Share
        </Button>
        <Button
          onClick={() => router.push(`/books/new/${id}`)}
          color={'hover:bg-secondaryLigth'}
        >
          Edit
        </Button>
        <Button onClick={toggleOptions} color={'bg-red-400 hover:bg-red-500'}>
          Cancel
        </Button>
      </div>
      <div
        onClick={toggleOptions}
        className='fixed top-0 left-0 right-0 bg-black/40 transition-all h-screen w-full z-[80]'
      />
    </div>
  )
}

export default PostOptions
