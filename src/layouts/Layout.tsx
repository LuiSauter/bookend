import { useSession } from 'next-auth/react'
import React from 'react'
import CardProfile from 'src/components/CardProfile/CardProfile'
import { NavBar } from 'src/components/Nav/NavBar'
import { LoadingPage } from './LoadingPage'

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const Layout = ({ children }: Props) => {
  const { data: session, status } = useSession()
  return (
    <div
      className="relative bg-primary text-textWhite min-h-screen md:w-full flex flex-col m-auto
    sm:flex-row sm:justify-center md:px-4
    md:flex-col md:justify-start 2xl:px-6"
    >
      {status === 'authenticated' && <NavBar />}

      <div className="flex flex-row items-start justify-center gap-4 sm:mt-4 xl:gap-6 2xl:gap-8">
        {status === 'authenticated' && (
          <section className="w-full hidden min-w-minAside max-w-aside sticky top-16 md:flex lg:max-w-maxAside mx-auto">
            <CardProfile />
          </section>
        )}
        <main className="sm:min-w-minPost max-w-post w-full mx-auto xl:max-w-maxPost">
          {children ? children : <LoadingPage />}
        </main>
        {status === 'authenticated' && (
          <section className="bg-green-500 hidden w-full max-w-aside min-w-minAside sticky top-16 lg:flex lg:max-w-maxAside xl:mr-0">
            trends trends trends trends trends trends trends trends trends
            trends trends trends trends trends trends trends trends trends
            trends trends trends trends trends trends trends trends trends
            trends trends trends trends trends trends trend
          </section>
        )}
      </div>
    </div>
  )
}
