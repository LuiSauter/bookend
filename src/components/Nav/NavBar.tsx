import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { Nav } from './Nav'
import { PhotoUser } from './PhotoUser'
import * as icons from '../../assets/icons'
import { useToggleUser } from 'src/hooks/useToggleUser'
import ClientOnly from '../ClientOnly'
import LoginModal from '../LoginModal'
import { useTranslate } from 'src/hooks/useTranslate'
import { useSession } from 'next-auth/react'
import { useLazyQuery, useMutation } from '@apollo/client'
import { FIND_USER } from 'src/users/graphql-queries'
import Image from 'next/image'
import { LOGINQL } from 'src/login/graphql-mutations'

export const NavBar = () => {
  const router = useRouter()
  const { handleToggleModal } = useToggleUser()
  const { loginOpen } = useToggleUser()
  const translate = useTranslate()
  const { status, data: session } = useSession()
  const [getUser, { data }] = useLazyQuery(FIND_USER)
  const [getLogin, { data: login }] = useMutation(LOGINQL, {
    refetchQueries: [
      { query: FIND_USER, variables: { email: session?.user?.email } },
    ],
  })

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      if (status === 'authenticated' && session?.user) {
        getLogin({
          variables: {
            name: session?.user.name,
            email: session?.user.email,
            image: session?.user.image,
          },
        })
      }
    }
    return () => {
      cleanup = false
    }
  }, [status === 'authenticated'])

  useEffect(() => {
    let cleanup = true
    if (cleanup && session?.user?.email && session?.user?.name) {
      getUser({ variables: { email: session?.user?.email } })
      if (login?.signin === 'signup') {
        router.reload()
      }
    }
    return () => {
      cleanup = false
    }
  }, [session?.user, login?.signin])


  return (
    <>
      {loginOpen && (
        <ClientOnly>
          <LoginModal />
        </ClientOnly>
      )}
      <nav
        className='dark:bg-primary/80 bg-white/50 backdrop-blur-md fixed bottom-0 right-0 left-0 sm:sticky sm:inset-0 flex w-full z-[70] transition-all
        sm:h-screen sm:flex-col sm:w-auto sm:pl-4 sm:pr-2 sm:py-4 sm:justify-between
        md:py-0 md:mx-0 md:px-4 md:flex-row md:w-full md:h-14 md:justify-center md:overflow-visible
        2xl:px-8'
      >
        <div className='flex w-full sm:items-center sm:flex-col md:flex-row md:justify-center md:w-min overflow-y-auto overflow-x-hidden'>
          <figure
            className='flex relative md:hidden sm:flex-shrink-0 items-center justify-center h-11 w-full transition-colors sm:h-12 sm:w-12 sm:rounded-full sm:mt-4 sm:mr-4 md:mt-0 md:h-12 md:w-12 md:hover:rounded-3xl dark:hover:bg-secondaryHover hover:bg-sky-200/70'
            onClick={handleToggleModal}
          >
            <Image
              layout='fill'
              className='object-contain md:hidden scale-[.70] h-full md:translate-y-[2px]'
              src='/images/bookend-logo.png'
              alt='bookend logo'
            />
          </figure>
          <button
            onClick={() => {
              router.push('/')
              return window.document.getElementById('search-books')?.focus()
            }}
            className='flex sm:flex-shrink-0 w-full h-full items-center mr-auto justify-center dark:hover:bg-slate-300/20 hover:bg-sky-200/70 sm:h-12 sm:w-12 sm:rounded-full sm:mt-4 md:mt-0 md:h-10 md:w-10 transition-all'
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
          <Nav
            visible={'flex md:w-min'}
            path={'/'}
            name={translate.nav.home}
            unique={true}
          >
            {router.pathname === '/' ? icons.homeCurrent : icons.home}
          </Nav>
          <Nav
            visible={'flex md:w-min'}
            path={'/books'}
            name={translate.nav.book}
            unique={true}
          >
            {router.pathname === '/books' ? icons.bookCurrent : icons.book}
          </Nav>
          {status === 'authenticated' && data?.findUser ? (
            <Nav
              visible={'flex md:w-min'}
              path={
                data?.findUser && data?.findUser.verified
                  ? '/books/new'
                  : '/search/users'
              }
              name={
                data?.findUser.verified
                  ? translate.nav.new
                  : translate.profile.users
              }
              unique={true}
            >
              {data?.findUser.verified
                ? router.pathname === '/books/new'
                  ? icons.newBookCurrent
                  : icons.newBook
                : router.pathname === '/search/users'
                  ? icons.allUsersCurrent
                  : icons.allUsers}
            </Nav>
          ) : (
            <Nav
              visible={'flex md:w-min'}
              path={'/search/users'}
              name={translate.profile.users}
              unique={true}
            >
              {router.pathname === '/search/users'
                ? icons.allUsersCurrent
                : icons.allUsers}
            </Nav>
          )}
        </div>
        <div className='mt-4 sm:mr-3 sm:flex md:hidden items-center justify-center'>
          <PhotoUser />
        </div>
      </nav>
    </>
  )
}
