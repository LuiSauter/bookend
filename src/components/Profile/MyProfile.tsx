import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useLazyQuery } from '@apollo/client'
import { FIND_PROFILE } from 'src/users/graphql-queries'
import { useRouter } from 'next/router'
import * as icons from 'src/assets/icons'
import { useToggleUser } from 'src/hooks/useToggleUser'
import ProfileForm from '../ProfileForm/ProfileForm'
import BtnFollow from '../Button/BtnFollow'
import Button from '../Button/Button'

interface Props {
  username: string | string[] | undefined;
}

const MyProfile = ({ username }: Props) => {
  const { data: session } = useSession()
  const router = useRouter()
  const [showTokenId, setShowTokenId] = useState({show: false, copy: false})
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

  return (
    <>
      <div className='flex bg-primary/80 backdrop-blur-md flex-row justify-start items-center gap-4 fixed top-0 py-2 w-full md:mt-0 md:bg-transparent md:backdrop-blur-none md:absolute md:top-0 z-10 pl-2 sm:pl-0'>
        <button
          className='rounded-full md:hidden hover:bg-secondaryLigth/50 flex flex-shrink-0 h-10 w-10 items-center justify-center'
          onClick={() => router.back()}
        >
          {icons.arrowLeft}
        </button>
        {data?.findProfile &&
          data?.findProfile.me.email === session?.user?.email && (
          <button
            onClick={handleEditProfile}
            className='border rounded-2xl px-2 py-1 hover:bg-secondaryLigth'
          >
              Edit Profile
          </button>
        )}
        <span className='text-lg md:hidden'>{data?.findProfile?.me.name}</span>
      </div>
      {editProfile && (
        <div className='fixed inset-0 h-screen w-full z-[90] overflow-hidden'>
          <div className=' bg-primary/5 backdrop-blur-sm w-full h-screen z-50 overflow-hidden' />
          <div className='absolute inset-0 h-screen sm:h-[90vh] w-full sm:w-[80vw] md:w-[70vw] lg:w-[60vw] xl:w-[50vw] bg-secondary m-auto overflow-y-auto z-50 sm:rounded-xl px-0'>
            <ProfileForm
              profileData={data?.findProfile}
              onClick={handleEditProfile}
            />
          </div>
        </div>
      )}
      <article className='w-full relative px-4 pt-14 md:pt-6'>
        <figure className='mx-auto relative mt-6 z-auto sm:mt-11 md:mt-14 w-28 sm:w-full rounded-full border-4 border-secondary max-w-maxPhotoProfile overflow-hidden'>
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
      <div className='px-4'>
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
        <span className='text-textGray text-base'>
          @{data?.findProfile?.me.username}
        </span>
        <p className='my-3'>{data?.findProfile?.description}</p>
        <div className='text-textGray flex flex-row flex-wrap'>
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
            className='text-textGray'
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
        <div className='flex flex-row justify-start mt-3'>
          <Link href='#'>
            <a className='flex flex-row items-center justify-center mr-7 hover:bg-secondaryLigth rounded-xl px-2'>
              <span className='font-bold mr-1'>
                {data?.findProfile?.following.length}
              </span>
              <span className='text-textGray text-sm'>Following</span>
            </a>
          </Link>
          <Link href='#'>
            <a className='flex flex-row items-center justify-center hover:bg-secondaryLigth rounded-xl px-2'>
              <span className='font-bold mr-1'>
                {data?.findProfile?.followers.length}
              </span>
              <span className='text-textGray text-sm'>Followers</span>
            </a>
          </Link>
        </div>
      </div>
    </>
  )
}

export default MyProfile
