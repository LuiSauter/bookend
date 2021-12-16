import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

export const PhotoUser = () => {
  const [dropdownOpen, setShowModal] = useState(false)
  const router = useRouter()
  const { data: session, status } = useSession()
  const handleSignOut = async () => {
    const data = await signOut({ redirect: false, callbackUrl: '/' })
    return router.replace(data?.url)
  }
  const handleModalOut = () => {
    console.log('button')
    setShowModal(!dropdownOpen)
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
      {dropdownOpen && (
        <>
          <div
            className="bg-secondary transition-colors rounded-md absolute hidden shadow-2xl shadow-secondaryLigth border border-secondaryLigth
            sm:flex sm:flex-col sm:z-50 sm:bottom-6 sm:-right-36 hover:shadow-xl sm:p-4
            md:-bottom-40 md:right-2"
          >
            <Link href={`/${session?.user?.name}`}>
              <a className="w-full hover:bg-secondaryLigth rounded-md py-1 px-3">
                See your profile
              </a>
            </Link>
            <button className="w-full hover:bg-secondaryLigth rounded-md py-1 px-3">
              Send feedback
            </button>
            <button className="w-full hover:bg-secondaryLigth rounded-md py-1 px-3">
              Settings
            </button>
            <hr className="border-secondaryLigth rounded-xl" />
            <button
              className="w-full hover:bg-red-500 rounded-md py-1 px-3 bg-red-400"
              onClick={handleSignOut}
            >
              Sign out
            </button>
          </div>
          <div
            x-show="dropdownOpen"
            onClick={() => setShowModal(false)}
            className="fixed inset-0 h-full w-full z-10"
          ></div>
        </>
      )}
    </>
  )
}
