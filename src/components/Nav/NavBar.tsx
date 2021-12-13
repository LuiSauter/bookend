import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'
import { Nav } from './Nav'
import { PhotoUser } from './PhotoUser'
import * as icons from '../../assets/icons'

export const NavBar = () => {
  // const router = useRouter()
  const { data: session, status } = useSession()
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
  // }
  return (
    <>
      <nav
        className="bg-primary sticky inset-0 flex w-full z-50 transition-all
        sm:h-screen sm:flex-col sm:w-auto sm:px-4 sm:py-4 sm:justify-between
        md:py-0 md:mx-0 md:px-0 md:flex-row md:w-full md:h-12 md:justify-between md:overflow-visible"
      >
        <div className="hidden md:flex justify-start w-full md:items-center">
          <Nav path={'/home'} visible={'flex md:bg-primary'}>
            <img className="w-9" src="/images/bookend-logo.png" alt="bookend" />
          </Nav>
          <div className="w-full flex items-center">
            <input
              placeholder="# Explore"
              className="flex w-48 rounded-xl bg-secondary text-gray-300 text-sm outline-none  px-2 py-2 font-medium ml-2"
              type="text"
            />
          </div>
        </div>
        <div className="flex w-full sm:flex-col sm:h-full sm:justify-between md:flex-row md:justify-end sm:overflow-visible">
          <div className="flex w-full sm:items-center sm:flex-col md:flex-row md:justify-center md:w-min">
            <Nav path={'/home'} visible={'flex md:hidden bg-primary'}>
              <img
                className="w-9"
                src="/images/bookend-logo.png"
                alt="bookend"
              />
            </Nav>
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
              visible={'flex md:w-max'}
              path={'/home'}
              name={'home'}
              unique={true}
            >
              {router.pathname === '/home' ? icons.homeCurrent : icons.home}
            </Nav>
            <Nav
              visible={'flex md:w-max'}
              path={'/books'}
              name={'Books'}
              unique={true}
            >
              {router.pathname === '/books' ? icons.bookCurrent : icons.book}
            </Nav>
            <Nav
              visible={'flex md:w-max'}
              path={'/notifications'}
              name={'Notifications'}
              unique={true}
            >
              {router.pathname === '/notifications'
                ? icons.notificationCurrent
                : icons.notification}
            </Nav>
            <Nav
              visible={'flex md:w-max'}
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
