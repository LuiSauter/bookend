import React, { useEffect } from 'react'
import Link from 'next/link'
import { useLazyQuery } from '@apollo/client'
import { useSession } from 'next-auth/react'
import { FIND_USER } from 'src/users/graphql-queries'
import { useRouter } from 'next/router'
import { checkVeriFied } from 'src/assets/icons'
import { LoadingIcon } from 'src/assets/icons/LoadingIcon'

const CardProfile = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [getUser, { data, loading }] = useLazyQuery(FIND_USER, { ssr: true })
  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      if (status === 'authenticated') {
        getUser({
          variables: { email: session?.user?.email },
        })
      }
    }
    return () => {
      cleanup = false
    }
  }, [status === 'authenticated'])
  return (
    <>
      {status === 'authenticated' &&
        router.asPath !== `/${data?.findUser?.me.username}` && (
        <article className='bg-secondary w-full rounded-xl flex flex-col snap-start shrink-0 gap-1 mb-4 items-center relative'>
          {loading ? (
            <div className='py-4'>
              <LoadingIcon />
            </div>
          ) : (
            <>
              <header className='m-0 w-full relative'>
                <div className='bg-backgroundImageFronPage absolute inset-0 w-full h-20 sm:rounded-lg'></div>
              </header>
              <img
                className='w-20 rounded-full m-auto mt-8 relative'
                src={data?.findUser?.me.photo || '/default-user.webp'}
                alt={data?.findUser?.me.name || 'bookend'}
              />
              {loading ? (
                <LoadingIcon />
              ) : (
                <div className='text-center mb-3 px-4'>
                  <h2 className='text-lg font-bold p-0 m-0 flex items-center justify-center gap-1'>
                    {data?.findUser?.me.name}
                    {data?.findUser?.verified && (
                      <span title='Verified account'>{checkVeriFied}</span>
                    )}
                  </h2>
                  <h3 className='text-textGray'>
                      @{data?.findUser?.me.username}
                  </h3>
                  <p className='text-sm'>{data?.findUser?.description}</p>
                </div>
              )}
              <div className='flex flex-row w-full justify-center border-t border-b border-textGray py-3'>
                <Link href='#'>
                  <a className='flex flex-col items-center justify-center w-full'>
                    <span className='font-bold'>
                      {data?.findUser?.following.length}
                    </span>
                    <span className='text-textGray text-sm'>Following</span>
                  </a>
                </Link>
                <span className='border-l border-textGray'></span>
                <Link href='#'>
                  <a className='flex flex-col items-center justify-center w-full'>
                    <span className='font-bold'>
                      {data?.findUser?.followers.length}
                    </span>
                    <span className='text-textGray text-sm'>Followers</span>
                  </a>
                </Link>
              </div>
              <Link href={`/${data?.findUser?.me.username}`}>
                <a className='text-sm text-center text-thirdBlue font-medium py-2 hover:bg-secondaryLigth w-full rounded-b-xl'>
                    My Profile
                </a>
              </Link>
            </>
          )}
        </article>
      )}
    </>
  )
}

export default CardProfile