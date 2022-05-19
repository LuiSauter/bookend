import React, { useEffect } from 'react'
import Image from 'next/image'
import { useLazyQuery } from '@apollo/client'
import { useSession } from 'next-auth/react'

import { LoadingIcon } from 'src/assets/icons/LoadingIcon'
import { useProfileId } from 'src/hooks/useProfileId'
import { FIND_USER } from 'src/users/graphql-queries'
import * as icons from 'src/assets/icons'
import { useTranslate } from 'src/hooks/useTranslate'

const Name = () => {
  const { data: session, status } = useSession()
  const { setProfileId, profile } = useProfileId()
  const translate = useTranslate()
  const [getUserByProfileId, { data }] = useLazyQuery(FIND_USER)

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      if (status === 'authenticated') {
        getUserByProfileId({ variables: { email: session?.user?.email } })
      }
    }
    return () => {
      cleanup = false
    }
  }, [status === 'authenticated'])


  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      if (profile === 'undefined' || profile === '') {
        setProfileId(data?.findUser?.me.username)
      }
      localStorage.setItem('profileUser', data?.findUser?.me.username)
    }
    return () => {
      cleanup = false
    }
  }, [data?.findUser])

  if (status === 'unauthenticated' && !session) {
    return (
      <figure className='animate-pulse hover:animate-none overflow-hidden sm:h-8 md:w-full md:h-8 md:flex flex-shrink-0 md:items-center hover:opacity-80'>
        <Image
          width={32}
          height={32}
          className='w-8 h-8 rounded-full md:w-7 md:h-7'
          src='/default-user.webp'
          alt='bookend free books'
        />
        <span className='hidden md:flex text-sm ml-2'>
          {translate.nav.login}
          {icons.chevronDown}
        </span>
      </figure>
    )
  }

  return status === 'loading' ? (
    <LoadingIcon />
  ) : (
    <>
      <figure className='overflow-hidden sm:h-auto md:w-full md:h-8 md:flex flex-shrink-0 md:items-center hover:opacity-80'>
        <Image
          width={32}
          height={32}
          className='w-8 h-8 rounded-full md:w-7 md:h-7'
          src={data?.findUser?.me.photo || '/default-user.webp'}
          alt={data?.findUser?.me.name}
        />
        <span className='ml-2 text-sm whitespace-nowrap w-full dark:text-textWhite hidden md:flex items-center'>
          {data?.findUser?.me.name}
          {data?.findUser?.verified && (
            <span title='Verified account' className='scale-90'>
              {icons.checkVeriFied}
            </span>
          )}
          {icons.chevronDown}
        </span>
      </figure>
    </>
  )
}

export default Name
