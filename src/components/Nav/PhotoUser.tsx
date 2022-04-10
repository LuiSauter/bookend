import { signOut, useSession } from 'next-auth/react'
import React from 'react'
import { useToggleUser } from 'src/hooks/useToggleUser'
import { checkVeriFied } from 'src/assets/icons'
import ClientOnly from '../ClientOnly'
import Name from './Name'
import UserOfModal from './UserOfModal'
import Button from '../Button/Button'
import { useRouter } from 'next/router'
import { useTranslate } from 'src/hooks/useTranslate'

export const PhotoUser = () => {
  const { status } = useSession()
  const { dropdownOpen, handleToggleModal, handleLoginOpen } = useToggleUser()
  const router = useRouter()
  const translate = useTranslate()

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
        className='hidden snap-start relative items-center overflow-hidden justify-center h-12 sm:min-h-nav md:mx-auto transition-colors sm:flex flex-shrink-0 dark:sm:hover:bg-secondaryHover dark:md:hover:bg-transparent sm:hover:bg-sky-200/70 md:bg-transparent sm:w-12 sm:rounded-full md:w-max md:h-14 md:hover:bg-transparent cursor-pointer md:my-auto'
        id='show-menu'
      >
        <ClientOnly>
          <Name />
        </ClientOnly>
      </div>
      {dropdownOpen && (
        <>
          <div
            className='dark:bg-secondary bg-slate-200 transition-colors rounded-xl absolute shadow-2xl shadow-thirdBlue/30 border dark:border-secondaryLigth  w-max sm:h-min
            flex bottom-12 left-4 flex-col z-[90] p-4 justify-center
            sm:top-auto sm:flex sm:flex-col sm:z-[90] sm:bottom-16 sm:-right-auto sm:py-4 sm:px-4
            md:top-12 md:ml-auto md:right-4'
          >
            {status === 'authenticated' ? (
              <ClientOnly>
                <UserOfModal />
              </ClientOnly>
            ) : (
              <span className='w-full rounded-md py-3 px-4 text-center text-slate-500'>
                {translate.nav.login}
              </span>
            )}
            <Button
              onClick={() => router.push('https://twitter.com/sauterdev')}
              color={'dark:hover:bg-secondaryLigth hover:bg-sky-200/70'}
            >
              {translate.setting.report}
            </Button>
            <Button
              onClick={() => {
                router.push('/settings')
                handleModalOut()
              }}
              color={'dark:hover:bg-secondaryLigth hover:bg-sky-200/70'}
            >
              <>{translate.setting.name}</>
            </Button>
            <Button
              onClick={() => router.push('https://twitter.com/sauterdev')}
              color={'dark:hover:bg-secondaryLigth hover:bg-sky-200/70'}
            >
              <>{translate.nav.verfication}</>
              <span className='dark:text-slate-400 text-slate-700 ml-1'>{checkVeriFied}</span>
            </Button>
            <hr className='dark:border-secondaryLigth border-slate-300 rounded-xl my-3' />
            {status === 'authenticated' ? (
              <button
                className='w-full text-white hover:opacity-80 rounded-md py-1 px-3 transition-opacity bg-red-500'
                onClick={handleSignOut}
              >
                {translate.nav.logout}
              </button>
            ) : (
              <button
                className='w-full text-white bg-thirdBlue rounded-md py-1 px-3 transition-all hover:bg-thirdBlue/90'
                onClick={() => {
                  handleToggleModal()
                  handleLoginOpen()
                }}
              >
                {translate.nav.login}
              </button>
            )}
          </div>
          <div
            x-show='dropdownOpen'
            onClick={handleToggleModal}
            className='fixed bottom-0 -left-5 md:left-0 right-0 h-screen sm:w-[95vw] md:w-full overflow-hidden z-40'
          ></div>
        </>
      )}
    </>
  )
}
