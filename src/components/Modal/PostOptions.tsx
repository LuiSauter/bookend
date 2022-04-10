import { useLazyQuery } from '@apollo/client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useTranslate } from 'src/hooks/useTranslate'
import { FIND_USER } from 'src/users/graphql-queries'
import Button from '../Button/Button'

interface Props {
  id: string | undefined
  toggleOptions?: () => void
}


const PostOptions = ({ id, toggleOptions }: Props) => {
  const router = useRouter()
  const { data: session } = useSession()
  const translate = useTranslate()
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
      <div className='dark:bg-secondary bg-sky-100 rounded-xl p-8 gap-2 flex flex-col w-[80vw] h-min z-[90] transition-all sm:w-80'>
        <Button
          onClick={() => console.log('button not available')}
          color={'dark:hover:bg-secondaryLigth hover:bg-sky-200/70'}
        >
          {translate.home.postOptions.report}
        </Button>
        <Button
          onClick={() => console.log('button not available')}
          color={'dark:hover:bg-secondaryLigth hover:bg-sky-200/70'}
        >
          {translate.home.postOptions.share}
        </Button>
        {data?.findUser.verified && isMatch && (
          <Button
            onClick={() => router.push(`/books/new/${id}`)}
            color={'dark:hover:bg-secondaryLigth hover:bg-sky-200/70'}
          >
            {translate.home.postOptions.edit}
          </Button>
        )}
        <Button onClick={toggleOptions} color={'bg-red-500 text-white hover:bg-red-400'}>
          {translate.home.postOptions.cancel}
        </Button>
      </div>
      <div
        onClick={toggleOptions}
        className='fixed top-0 left-0 right-0 bg-black/50 transition-all h-screen w-full z-[80]'
      />
    </div>
  )
}

export default PostOptions
