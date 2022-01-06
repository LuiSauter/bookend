import { useRouter } from 'next/router'
import React from 'react'
import { Nav } from './Nav'
import { PhotoUser } from './PhotoUser'
import * as icons from '../../assets/icons'
import { useToggleUser } from 'src/hooks/useToggleUser'
import ClientOnly from '../ClientOnly'
import LoginModal from '../LoginModal'

export const NavBar = () => {
  // const router = useRouter()
  const router = useRouter()
  // const [darkMode, setDarkMode] = useState(false)
  // const handleClick = () => {
  //   document.documentElement.classList.toggle('dark')
  //   setDarkMode(!darkMode)
  // }
  // const text = !darkMode ? 'dark mode' : 'light mode'

  // const handleSignOut = async () => {
  //   const data = await signOut({ redirect: false, callbackUrl: '/' })
  //   return router.replace(data?.url)
  const { handleToggleModal } = useToggleUser()
  const { loginOpen } = useToggleUser()
  return (
    <>
      {loginOpen && (
        <ClientOnly>
          <LoginModal />
        </ClientOnly>
      )}
      <nav
        className="bg-primary/70 backdrop-blur-md fixed bottom-0 sm:sticky sm:inset-0 flex w-full z-50 transition-all
        sm:h-screen sm:flex-col sm:w-auto sm:pl-4 sm:pr-2 sm:py-4 sm:justify-between
        md:py-0 md:mx-0 md:px-4 md:flex-row md:w-full md:h-12 md:justify-between md:overflow-visible 2xl:px-6"
      >
        <div className="hidden md:flex justify-center md:items-center relative bg-transparent">
          <Nav
            path={'/'}
            visible={
              'flex relative overflow-hidden md:m-0 md:p-0 md:hover:bg-transparent'
            }
          >
            <img
              className="w-8 m-auto"
              src="/images/bookend-logo.png"
              alt="bookend"
            />
          </Nav>
          <div className="flex items-center">
            <input
              placeholder="# Explore"
              className="flex w-48 rounded-xl bg-secondary text-gray-300 text-sm outline-none  px-2 py-[0.4rem] font-medium ml-2"
              type="text"
            />
          </div>
        </div>
        <div
          className="flex w-full sm:flex-col sm:h-full sm:justify-between sm:overflow-y-auto
          md:flex-row md:justify-end"
        >
          <div className="flex w-full sm:items-center sm:flex-col md:flex-row md:justify-center md:w-min">
            <div
              className="flex md:hidden items-center justify-center w-full h-11 transition-colorssm:h-12
              sm:w-12 sm:rounded-full sm:mt-4 sm:mr-4
              md:mt-0 md:h-8 md:w-12 md:hover:rounded-3xl hover:bg-secondaryHover"
            >
              <img
                onClick={handleToggleModal}
                className="w-9 md:hidden"
                src="/images/bookend-logo.png"
                alt="bookend logo"
              />
            </div>
            <Nav path={'/search'} visible={'flex md:hidden'}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </Nav>
            <Nav
              visible={'flex md:w-min'}
              path={'/'}
              name={'inicio'}
              unique={true}
            >
              {router.pathname === '/' ? icons.homeCurrent : icons.home}
            </Nav>
            <Nav
              visible={'flex md:w-min'}
              path={'/books'}
              name={'Books'}
              unique={true}
            >
              {router.pathname === '/books' ? icons.bookCurrent : icons.book}
            </Nav>
            <Nav
              visible={'flex md:w-min'}
              path={'/notifications'}
              name={'Notifications'}
              unique={true}
            >
              {router.pathname === '/notifications'
                ? icons.notificationCurrent
                : icons.notification}
            </Nav>
            <Nav
              visible={'flex md:w-min'}
              path={'/message'}
              name={'Message'}
              unique={true}
            >
              {router.pathname === '/message'
                ? icons.messageCurrent
                : icons.message}
            </Nav>
          </div>
          <PhotoUser />
        </div>
      </nav>
    </>
  )
}
