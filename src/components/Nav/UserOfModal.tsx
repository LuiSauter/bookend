import React, { useEffect } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useLazyQuery } from '@apollo/client'

import { useToggleUser } from 'src/hooks/useToggleUser'
import { FIND_USER } from 'src/users/graphql-queries'
import { LoadingIcon } from 'src/assets/icons/LoadingIcon'
import * as icons from 'src/assets/icons'
import { useTranslate } from 'src/hooks/useTranslate'
import PhotoUser from '../User/PhotoUser'

const UserOfModal = () => {
  const { data: session, status } = useSession()
  const { handleToggleModal } = useToggleUser()
  const [getUserByEmail, { data, loading }] = useLazyQuery(FIND_USER)
  const translate = useTranslate()

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      if (status === 'authenticated') {
        getUserByEmail({ variables: { email: session?.user?.email } })
      }
    }
    return () => {
      cleanup = false
    }
  }, [status === 'authenticated'])

  const handleModalOut = () => {
    handleToggleModal()
  }
  return loading ? (
    <LoadingIcon />
  ) : (
    <Link href={`/${data?.findUser?.me.username}`}>
      <a
        onClick={handleModalOut}
        className='w-full dark:hover:bg-secondaryLigth hover:bg-sky-200/70 transition-all rounded-md py-1 px-4 flex items-center justify-center'
      >
        <figure className='w-12 h-12 relative overflow-hidden flex flex-shrink-0 rounded-full'>
          <PhotoUser
            nameAlt={data?.findUser?.me.name}
            photoURL={session?.user?.image || undefined}
            styles='rounded-full'
            placeholder={true}
            priority={true}
          />
        </figure>
        <div className='flex flex-col ml-4'>
          <h2 className='flex items-center whitespace-nowrap font-medium'>
            {data?.findUser?.me.name}
            {data?.findUser?.verified && (
              <span title='Verified account' className='scale-90'>
                {icons.checkVeriFied}
              </span>
            )}
          </h2>
          <span
            translate='no'
            className='text-sm dark:text-slate-400 text-slate-700'
          >
            @{data?.findUser?.me.username}
          </span>
          <span className='text-sm dark:text-slate-400 text-slate-700'>
            {translate.nav.showProfile}
          </span>
        </div>
      </a>
    </Link>
  )
}

export default UserOfModal
