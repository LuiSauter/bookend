import React, { Fragment, useEffect } from 'react'
import Link from 'next/link'
import { useLazyQuery } from '@apollo/client'
import { useSession } from 'next-auth/react'
import { FIND_USER, GET_DOMINANT_COLOR } from 'src/users/graphql-queries'
import { useRouter } from 'next/router'
import { checkVeriFied } from 'src/assets/icons'
import { LoadingIcon } from 'src/assets/icons/LoadingIcon'
import { useTranslate } from 'src/hooks/useTranslate'
import { useDominanColor } from 'src/hooks/useDominantColor'
import CountFollows from '../CountFollows'
import ClientOnly from '../ClientOnly'

const CardProfile = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const translate = useTranslate()
  const [getUser, { data, loading }] = useLazyQuery(FIND_USER, { ssr: true })
  const [getColor, { data: dataColor }] = useLazyQuery(GET_DOMINANT_COLOR)

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

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      data?.findUser &&
        getColor({ variables: { image: data?.findUser.me.photo } })
    }
    return () => {
      cleanup = false
    }
  }, [data?.findUser])

  const { dominantColor } = useDominanColor(dataColor?.getColors)

  return (
    <Fragment>
      {status === 'authenticated' &&
        router.asPath !== `/${data?.findUser?.me.username}` && (
        <article className='dark:bg-secondary bg-slate-200 border border-textGray/10 w-full rounded-xl flex flex-col shrink-0 mb-4 justify-center relative'>
          {loading ? (
            <div className='p-4 w-full h-full flex justify-center items-center'>
              <LoadingIcon />
            </div>
          ) : (
            <>
              <header className='m-0 w-full relative'>
                <div
                  style={{
                    backgroundColor: dominantColor,
                  }}
                  className='bg-backgroundImageFronPage absolute inset-0 w-full h-20 sm:rounded-t-xl dark:opacity-100 opacity-50'
                />
              </header>
              <img
                className='w-20 rounded-full m-auto mt-8 relative ring-4 ring-secondary/50'
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
                  <h3
                    translate='no'
                    className='dark:text-slate-400 text-slate-700'
                  >
                      @{data?.findUser?.me.username}
                  </h3>
                  <p className='text-sm'>{data?.findUser?.description}</p>
                </div>
              )}
              <ClientOnly>
                <CountFollows
                  design='colunm'
                  username={data?.findUser?.me.username}
                />
              </ClientOnly>
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