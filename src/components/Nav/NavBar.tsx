import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'
import { Nav } from './Nav'
import { PhotoUser } from './PhotoUser'
export const NavBar = () => {
  // const router = useRouter()
  const { data: session, status } = useSession()
  // const handleSignOut = async () => {
  //   const data = await signOut({ redirect: false, callbackUrl: '/' })
  //   return router.replace(data?.url)
  // }
  return (
    <>
      {session === null ? (
        <nav className="z-20 fixed bottom-0 flex w-full h-11 items-center justify-center gap-4">
          <div className="text-textGray border-dashed border-b border-textGray">
            <button
              className="text-base font-semibold w-full h-full transition-colors hover:text-textWhite"
              onClick={() => signIn('', { callbackUrl: '/home' })}
            >
              signin
            </button>
          </div>
          <div className="">
            <p className="text-textGray border-dashed border-b border-textGray">
              create by:
              <span className="font-semibold hover:text-textWhite">
                sauterdev
              </span>
            </p>
          </div>
        </nav>
      ) : (
        <nav className="bg-primary sticky inset-0 flex w-full z-50 sm:h-screen sm:flex-col sm:w-auto sm:px-4 sm:py-4 sm:justify-between sm:overflow-x-hidden sm:overflow-y-auto md:py-0 md:mx-0 md:px-0 md:flex-row md:w-full md:h-12 md:justify-between md:overflow-visible">
          <div className="hidden md:flex justify-start w-full md:items-center">
            <Nav visible={'flex hover:w-12 md:hover:bg-primary'}>
              <img
                className="w-8"
                src="/images/bookend-logo.png"
                alt="bookend"
              />
            </Nav>
            <div className="w-full flex items-center">
              <input
                placeholder="# Explore"
                className="flex w-48 rounded-xl bg-secondary text-gray-300 text-sm outline-none  px-2 py-2 font-medium ml-2"
                type="text"
              />
            </div>
          </div>
          <div className="flex w-full sm:flex-col sm:h-full sm:justify-between md:flex-row md:justify-end">
            <div className="flex w-full sm:items-center sm:flex-col md:flex-row md:justify-center md:w-min">
              <Nav visible={'flex md:hidden'}>
                <img
                  className="w-9"
                  src="/images/bookend-logo.png"
                  alt="bookend"
                />
              </Nav>
              <Nav visible={'flex md:hidden'}>
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
              <Nav visible={'flex md:w-max'}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 md:h-5 md:w-5 md:mx-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <h2 className="hidden font-medium text-sm md:pr-2">Home</h2>
              </Nav>
              <Nav visible={'flex md:w-max'}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 md:h-5 md:w-5 md:mx-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                <h2 className="hidden font-medium text-sm md:pr-2">Books</h2>
              </Nav>
              <Nav visible={'flex md:w-max'}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 md:h-5 md:w-5 md:mx-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <h2 className="hidden font-medium text-sm md:pr-2">
                  Notifications
                </h2>
              </Nav>
              <Nav visible={'flex md:w-max'}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 md:h-5 md:w-5 md:mx-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
                <h2 className="hidden font-medium text-sm md:pr-2">Message</h2>
              </Nav>
            </div>
            <PhotoUser />
          </div>
        </nav>
      )}
    </>
  )
}
