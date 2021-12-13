import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export const PhotoUser = () => {
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()
  const { data: session, status } = useSession()
  const handleSignOut = async () => {
    const data = await signOut({ redirect: false, callbackUrl: '/' })
    return router.replace(data?.url)
  }
  const handleModalOut = () => {
    console.log('button')
    setShowModal(!showModal)
  }

  return (
    <>
      <div
        onClick={handleModalOut}
        className="hidden items-center justify-center h-12 sm:h-12 sm:min-h-nav sm:w-12 transition-colors sm:flex sm:hover:bg-secondaryHover sm:rounded-full md:w-max md:h-12 md:hover:bg-transparent cursor-pointer active focus:bg-red-600"
        id="show-menu"
      >
        <figure className="bg-secondary hover:bg-secondaryLigth overflow-hidden sm:h-auto md:w-full md:rounded-3xl md:h-8 md:flex md:items-center">
          <img
            className="w-8 rounded-full md:w-6 md:ml-1"
            src={
              session?.user?.image ? session?.user?.image : '/default-user.webp'
            }
            alt={session?.user?.name ? session?.user?.name : ''}
          />
          <span className="text-small whitespace-nowrap text-textWhite px-2 hidden md:flex">
            {session?.user?.name ? session?.user?.name : ''}
          </span>
        </figure>
      </div>
      <div className="bg-red-500 absolute md:block transform z-50 md: md:right-4 md:px-4 md:py-1">
        <span>Sign out</span>
      </div>
      {/* {showModal && (
        <div className="bg-red-500 absolute hidden md:block z-50 md:-bottom-7 md:right-4 md:px-4 md:py-1">
          <span>Sign out</span>
        </div>
      )} */}
    </>
  )
}
