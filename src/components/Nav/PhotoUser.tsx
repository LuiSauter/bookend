import { signOut, useSession } from 'next-auth/react'
import React from 'react'
import { useToggleUser } from 'src/hooks/useToggleUser'
import { checkVeriFied } from 'src/assets/icons'
import ClientOnly from '../ClientOnly'
import Name from './Name'
import UserOfModal from './UserOfModal'
import Button from '../Button/Button'
import { useRouter } from 'next/router'

export const PhotoUser = () => {
  const { status } = useSession()
  const { dropdownOpen, handleToggleModal, handleLoginOpen } = useToggleUser()
  const router = useRouter()

  const handleSignOut = async () => {
    localStorage.removeItem('profileId')
    return await signOut()
  }

  const handleModalOut = () => {
    handleToggleModal()
  }

  return (
    <>
      <div
        onClick={handleModalOut}
        className='hidden relative items-center overflow-hidden justify-center h-12 sm:min-h-nav md:mx-auto transition-colors sm:flex flex-shrink-0 sm:hover:bg-secondaryHover sm:w-12 sm:rounded-full md:w-max md:h-14 md:hover:bg-transparent cursor-pointer md:my-auto'
        id='show-menu'
      >
        <ClientOnly>
          <Name />
        </ClientOnly>
      </div>
      {dropdownOpen && (
        <>
          <div
            className='bg-secondary transition-colors rounded-xl absolute shadow-2xl shadow-thirdBlue/30 border border-secondaryLigth w-max sm:h-min
            flex bottom-12 left-4 flex-col z-50 p-4 justify-center
            sm:top-auto sm:flex sm:flex-col sm:z-50 sm:bottom-16 sm:-right-auto sm:py-4 sm:px-4
            md:top-12 md:ml-auto md:right-4'
          >
            {status === 'authenticated' ? (
              <ClientOnly>
                <UserOfModal />
              </ClientOnly>
            ) : (
              <span className='w-full rounded-md py-3 px-4 text-center text-slate-500'>
                Sign In
              </span>
            )}
            <Button
              onClick={() => router.push('https://twitter.com/sauterdev')}
              color={'hover:bg-secondaryLigth'}
            >
              Report bug
            </Button>
            <button className='w-full hover:bg-secondaryLigth rounded-md py-1 px-4 cursor-auto'>
              Settings
            </button>
            <Button
              onClick={() => router.push('https://twitter.com/sauterdev')}
              color={'hover:bg-secondaryLigth'}
            >
              <>request verification</>
              <span className='text-textGray ml-1'>{checkVeriFied}</span>
            </Button>
            <hr className='border-secondaryLigth rounded-xl my-3' />
            {status === 'authenticated' ? (
              <button
                className='w-full hover:bg-red-500 rounded-md py-1 px-3 bg-red-400'
                onClick={handleSignOut}
              >
                Sign out
              </button>
            ) : (
              <button
                className='w-full hover:bg-thirdBlue rounded-md py-1 px-3 bg-blue-400'
                onClick={() => {
                  handleToggleModal()
                  handleLoginOpen()
                }}
              >
                Sign in
              </button>
            )}
          </div>
          <div
            x-show='dropdownOpen'
            onClick={handleToggleModal}
            className='fixed bottom-0 left-0 right-0 h-screen sm:w-[97vw] md:w-full sm:inset-0 overflow-hidden z-10'
          ></div>
        </>
      )}
    </>
  )
}
