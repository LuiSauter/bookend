import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useLazyQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

import { FIND_PROFILE } from 'src/users/graphql-queries'
import { useTranslate } from 'src/hooks/useTranslate'
import { useToggleUser } from 'src/hooks/useToggleUser'
import * as icons from 'src/assets/icons'
import ProfileForm from '../ProfileForm/ProfileForm'
import BtnFollow from '../Button/BtnFollow'

interface Props {
  username: string | string[] | undefined
}

const MyProfile = ({ username }: Props) => {
  const { data: session } = useSession()
  const router = useRouter()
  const [showTokenId, setShowTokenId] = useState({ show: false, copy: false })
  const translate = useTranslate()
  const [getProfile, { data, loading }] = useLazyQuery(FIND_PROFILE)
  const { handleEditProfile, editProfile } = useToggleUser()

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      username && getProfile({ variables: { username } })
    }
    return () => {
      cleanup = false
    }
  }, [username])

  if (data?.findProfile === null) {
    router.push('/')
  }

  const handleBack = () => {
    history.length <= 2 ? router.push('/') : router.back()
  }

  return (
    <>
      <div className='flex dark:bg-primary/80 bg-white/80 backdrop-blur-md flex-row justify-start items-center gap-4 fixed top-0 py-2 w-full md:mt-0 dark:md:bg-transparent md:bg-transparent md:backdrop-blur-none md:absolute md:top-0 z-10 pl-2 sm:pl-0'>
        <button
          className='rounded-full md:hidden dark:hover:bg-secondaryLigth/50 hover:bg-sky-200/70 flex flex-shrink-0 h-10 w-10 items-center justify-center'
          onClick={handleBack}
        >
          {icons.arrowLeft}
        </button>
        {data?.findProfile &&
          data?.findProfile.me.email === session?.user?.email && (
          <button
            onClick={handleEditProfile}
            className='border-2 dark:border-slate-300 border-slate-400 dark:text-white text-slate-700 md:border-slate-50 md:text-slate-50 rounded-2xl px-2 py-1 dark:hover:bg-secondaryLigth hover:bg-sky-200/70 md:ml-2'
          >
            {translate.profile.edit}
          </button>
        )}
        <span className='text-lg md:hidden'>{data?.findProfile?.me.name}</span>
      </div>
      {editProfile && (
        <div className='fixed inset-0 h-screen w-full z-[90] overflow-hidden'>
          <div className='dark:bg-primary/5 bg-black/50 backdrop-blur-sm w-full h-screen z-50 overflow-hidden' />
          <div className='absolute inset-0 h-screen sm:h-[90vh] w-full sm:w-[80vw] md:w-[70vw] lg:w-[60vw] xl:w-[50vw] dark:bg-secondary bg-slate-200 m-auto overflow-y-auto z-50 sm:rounded-xl px-0'>
            <ProfileForm
              profileData={data?.findProfile}
              onClick={handleEditProfile}
            />
          </div>
        </div>
      )}
      <article className='w-full relative px-4 pt-14 md:pt-6'>
        <figure className='mx-auto relative mt-10 z-auto sm:mt-11 md:mt-14 w-28 sm:w-full rounded-full border-4 dark:border-secondary border-slate-300 max-w-maxPhotoProfile overflow-hidden'>
          {loading ? (
            <img
              className='w-full rounded-full h-full z-auto relative'
              src='/default-user.webp'
              alt='bookend'
            />
          ) : (
            <img
              className='w-full rounded-full h-full z-auto relative'
              src={data?.findProfile?.me.photo || '/default-user.webp'}
              alt={data?.findProfile?.me.name}
            />
          )}
        </figure>
      </article>
      <div className='border-b-2 border-textGray/20'>
        <div className='px-4 sm:px-0 lg:px-4'>
          <div className='text-lg mt-4 font-bold flex items-center justify-start gap-4'>
            <h2 className='flex items-center'>
              {data?.findProfile?.me.name}
              {data?.findProfile?.verified && (
                <span title='Verified account'>{icons.checkVeriFied}</span>
              )}
            </h2>
            {data?.findProfile.me.email !== session?.user?.email && (
              <BtnFollow user={data?.findProfile?.me.user} />
            )}
          </div>
          <span
            translate='no'
            className='dark:text-slate-400 text-slate-700 text-base'
          >
            @{data?.findProfile?.me.username}
          </span>
          <p className='my-3'>{data?.findProfile?.description}</p>
          <div className='dark:text-slate-400 text-slate-700 flex flex-row flex-wrap'>
            {data?.findProfile?.location && (
              <span className='mr-4'>{data?.findProfile?.location}</span>
            )}
            {data?.findProfile?.website && (
              <Link href={`https://${data?.findProfile?.website}`}>
                <a
                  target='_blank'
                  className='text-thirdBlue hover:underline mr-4'
                >
                  {data?.findProfile?.website}
                </a>
              </Link>
            )}
          </div>
          {data?.findProfile.me.email === session?.user?.email && (
            <button
              className='dark:text-slate-400 text-slate-700'
              onClick={() => setShowTokenId({ show: true, copy: false })}
            >
              {!showTokenId.show ? (
                'see token-id'
              ) : (
                <span
                  onClick={async (e) => {
                    e.stopPropagation()
                    setShowTokenId({ show: true, copy: true })
                    return await navigator.clipboard.writeText(
                      data?.findProfile?.me.user
                    )
                  }}
                  className={showTokenId.copy ? 'text-green-500' : ''}
                >
                  {data?.findProfile?.me.user}
                </span>
              )}
            </button>
          )}
          <div className='flex flex-row justify-start my-3'>
            <Link href='#'>
              <a className='flex flex-row items-center justify-center mr-7 rounded-xl hover:opacity-80'>
                <span className='font-bold mr-1'>
                  {data?.findProfile?.following.length}
                </span>
                <span className='dark:text-slate-400 text-slate-700 text-sm'>
                  {translate.profile.following}
                </span>
              </a>
            </Link>
            <Link href='#'>
              <a className='flex flex-row items-center justify-center hover:opacity-80'>
                <span className='font-bold mr-1'>
                  {data?.findProfile?.followers.length}
                </span>
                <span className='dark:text-slate-400 text-slate-700 text-sm'>
                  {translate.profile.followers}
                </span>
              </a>
            </Link>
          </div>
        </div>
        {!data?.findProfile?.verified && <div className='flex flex-row justify-start items-center'>
          <button className='px-6 pt-2 flex flex-col dark:hover:bg-secondaryLigth hover:bg-sky-200'>
            <span className='border-thirdBlue text-lg font-medium pb-1'>
              {translate.profile.liked}
            </span>
            <span className='border-2 bg-thirdBlue w-full border-thirdBlue rounded-2xl' />
          </button>
        </div>}
      </div>
    </>
  )
}

export default MyProfile
