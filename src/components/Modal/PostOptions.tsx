import { useLazyQuery } from '@apollo/client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { FIND_USER } from 'src/users/graphql-queries'
import Button from '../Button/Button'

interface Props {
  id: string | undefined
  toggleOptions?: () => void
}


const PostOptions = ({ id, toggleOptions }: Props) => {
  const router = useRouter()
  const { data: session } = useSession()
  const [getUserByEmail, { data }] = useLazyQuery(FIND_USER)

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      session?.user?.email &&
        getUserByEmail({ variables: { email: session?.user?.email } })
    }

    return () => {
      cleanup = false
    }
  }, [session?.user])

  const isMatch = data?.findUser.post.some((p:string) => p === id)

  return (
    <div className='fixed inset-0 w-full h-full grid place-content-center place-items-center z-[80]'>
      <div className='bg-secondary rounded-xl p-8 gap-2 flex flex-col w-[80vw] h-min z-[90] transition-all sm:w-80'>
        <Button
          onClick={() => console.log('button not available')}
          color={'hover:bg-secondaryLigth'}
        >
          Report
        </Button>
        <Button
          onClick={() => console.log('button not available')}
          color={'hover:bg-secondaryLigth'}
        >
          Share
        </Button>
        {data?.findUser.verified && isMatch && (
          <Button
            onClick={() => router.push(`/books/new/${id}`)}
            color={'hover:bg-secondaryLigth'}
          >
            Edit
          </Button>
        )}
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
