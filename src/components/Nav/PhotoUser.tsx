import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useLazyQuery } from '@apollo/client'
import { FIND_USER } from 'src/users/graphql-queries'
import { useToggleUser } from 'src/hooks/useToggleUser'

export const PhotoUser = () => {
  const [dataProfile, setDataProfile] = useState<Profile | null>(null)
  const { data: session, status } = useSession()
  const { dropdownOpen, handleToggleModal } = useToggleUser()
  const router = useRouter()
  const [getUserByProfileId, { data, loading }] = useLazyQuery(FIND_USER)

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
      data?.findUser && setDataProfile(data?.findUser)
    }
    return () => {
      cleanup = false
    }
  }, [data?.findUser])

  const handleSignOut = async () => {
    localStorage.removeItem('profileId')
    const data = await signOut({ redirect: false, callbackUrl: '/' })
    return router.replace(data?.url)
  }

  const handleModalOut = () => {
    handleToggleModal()
  }

  return (
    <>
      <div
        onClick={handleModalOut}
        className="hidden relative items-center justify-center h-12 sm:h-12 sm:min-h-nav sm:w-12 transition-colors sm:flex sm:hover:bg-secondaryHover sm:rounded-full md:w-max md:h-12 md:hover:bg-transparent cursor-pointer active focus:bg-red-600"
        id="show-menu"
      >
        <figure className="bg-secondary hover:bg-secondaryLigth overflow-hidden sm:h-auto md:w-full md:rounded-3xl md:h-8 md:flex md:items-center rounded-full">
          <img
            className="w-8 rounded-full md:w-6 md:ml-1"
            src={
              session?.user?.image ? session?.user?.image : '/default-user.webp'
            }
            alt={session?.user?.name ? session?.user?.name : ''}
          />
          {loading ? (
            'loading...'
          ) : (
            <span className="text-xs whitespace-nowrap w-full text-textWhite px-2 hidden md:flex">
              {dataProfile?.me.name ? dataProfile?.me.name : 'loading...'}
            </span>
          )}
        </figure>
      </div>
      {dropdownOpen && (
        <>
          <div
            className="bg-secondary transition-colors rounded-md absolute shadow-2xl shadow-secondaryLigth border border-secondaryLigth w-max sm:h-min
            flex top-12 left-auto flex-col z-50 p-4 justify-center
            sm:top-auto sm:flex sm:flex-col sm:z-50 sm:bottom-16 sm:-right-auto hover:shadow-xl sm:py-4 sm:px-4
            md:-bottom-56 md:right-auto"
          >
            <Link href={`/${dataProfile?.me.username}`}>
              <a
                onClick={handleModalOut}
                className="w-full hover:bg-secondaryLigth rounded-md py-1 px-4 flex items-center justify-center"
              >
                <img
                  src={
                    session?.user?.image
                      ? session?.user?.image
                      : '/default-user.webp'
                  }
                  className="w-8 rounded-full md:w-12 mr-4"
                  alt={dataProfile?.me.name}
                />
                <div className="flex flex-col">
                  <h2>{dataProfile?.me.name}</h2>
                  <span className="text-sm text-gray-400">
                    @{dataProfile?.me.username}
                  </span>
                  <span className="text-sm text-textGray">
                    See your profile
                  </span>
                </div>
              </a>
            </Link>
            <button className="w-full hover:bg-secondaryLigth rounded-md py-1 px-4 cursor-auto">
              Send feedback
            </button>
            <button className="w-full hover:bg-secondaryLigth rounded-md py-1 px-4 cursor-auto">
              Settings
            </button>
            <hr className="border-secondaryLigth rounded-xl my-3" />
            <button
              className="w-full hover:bg-red-500 rounded-md py-1 px-3 bg-red-400"
              onClick={handleSignOut}
            >
              Sign out
            </button>
          </div>
          <div
            x-show="dropdownOpen"
            onClick={handleToggleModal}
            className="fixed inset-0 h-full w-full z-10"
          ></div>
        </>
      )}
    </>
  )
}
