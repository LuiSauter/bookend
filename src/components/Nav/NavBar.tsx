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
        className='bg-primary/80 backdrop-blur-md fixed bottom-0 sm:sticky sm:inset-0 flex w-full z-[70] transition-all
        sm:h-screen sm:flex-col sm:w-auto sm:pl-4 sm:pr-2 sm:py-4 sm:justify-between
        md:py-0 md:mx-0 md:px-4 md:flex-row md:w-full md:h-14 md:justify-between md:overflow-visible
        lg:pr-6 2xl:px-8'
      >
        <div
          onClick={() => router.push('/')}
          className='hidden md:flex gap-3 justify-center md:items-center relative bg-transparent cursor-pointer hover:opacity-90 transition-opacity'
        >
          <img
            className='w-8 h-auto ml-2'
            src='/images/bookend-logo.png'
            alt='bookend'
          />
          <h1 className='text-xl font-medium font-mono hidden lg:block'>
            Bookend
          </h1>
          {router.query.username && (
            <button
              className='rounded-full hover:bg-secondaryLigth/50 flex flex-shrink-0 h-10 w-10 items-center justify-center'
              onClick={() => router.back()}
            >
              {icons.arrowLeft}
            </button>
          )}
        </div>
        <div className='flex w-full sm:items-center sm:flex-col md:flex-row md:justify-center md:w-min'>
          <div
            className='flex md:hidden items-center justify-center w-full h-11 transition-colorssm:h-12
              sm:w-12 sm:rounded-full sm:mt-4 sm:mr-4
              md:mt-0 md:h-8 md:w-12 md:hover:rounded-3xl hover:bg-secondaryHover'
            onClick={handleToggleModal}
          >
            <img
              className='w-9 md:hidden'
              src='/images/bookend-logo.png'
              alt='bookend logo'
            />
          </div>
          <button
            onClick={() => {
              router.push('/')
              return window.document.getElementById('search-books')?.focus()
            }}
            className='flex w-full h-full items-center mr-auto justify-center hover:bg-secondaryHover/70 sm:h-12 sm:w-12 sm:rounded-full sm:mt-4 md:mt-0 md:h-10 md:w-10'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              />
            </svg>
          </button>
          <Nav visible={'flex md:w-min'} path={'/'} name={'Home'} unique={true}>
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
      </nav>
    </>
  )
}
