import React, { Fragment, useEffect } from 'react'
import Link from 'next/link'
import { useLazyQuery } from '@apollo/client'
import { useSession } from 'next-auth/react'
import { FIND_USER } from 'src/users/graphql-queries'
import { useRouter } from 'next/router'
import { checkVeriFied } from 'src/assets/icons'
import { LoadingIcon } from 'src/assets/icons/LoadingIcon'
import { useTranslate } from 'src/hooks/useTranslate'

const CardProfile = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const translate = useTranslate()
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
    <Fragment>
      {status === 'authenticated' &&
        router.asPath !== `/${data?.findUser?.me.username}` && (
        <article className='dark:bg-secondary bg-slate-200 border border-textGray/10 w-full rounded-xl flex flex-col shrink-0 mb-4 items-center justify-center relative'>
          {loading ? (
            <div className='p-4 w-full h-full flex justify-center items-center'>
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
                  <h2 className='text-lg font-bold p-0 m-0 flex items-center justify-center'>
                    {data?.findUser?.me.name}
                    {data?.findUser?.verified && (
                      <span title='Verified account'>{checkVeriFied}</span>
                    )}
                  </h2>
                  <h3 translate='no' className='dark:text-slate-400 text-slate-700'>
                      @{data?.findUser?.me.username}
                  </h3>
                  <p className='text-sm'>{data?.findUser?.description}</p>
                </div>
              )}
              <div className='flex flex-row w-full justify-center border-t border-b border-textGray/10 py-3'>
                <Link href='#'>
                  <a className='flex flex-col items-center justify-center w-full'>
                    <span className='font-bold'>
                      {data?.findUser?.following.length}
                    </span>
                    <span className='dark:text-slate-400 text-slate-700 text-sm'>
                      {translate.profile.following}
                    </span>
                  </a>
                </Link>
                <span className='border-l border-textGray/10' />
                <Link href='#'>
                  <a className='flex flex-col items-center justify-center w-full'>
                    <span className='font-bold'>
                      {data?.findUser?.followers.length}
                    </span>
                    <span className='dark:text-slate-400 text-slate-700 text-sm'>
                      {translate.profile.followers}
                    </span>
                  </a>
                </Link>
              </div>
              <Link href={`/${data?.findUser?.me.username}`}>
                <a className='text-sm text-center text-thirdBlue font-medium py-2 dark:hover:bg-textGray/10 hover:bg-sky-200/70 w-full rounded-b-xl'>
                  {translate.profile.me}
                </a>
              </Link>
            </>
          )}
        </article>
      )}
    </Fragment>
  )

}

export default CardProfile