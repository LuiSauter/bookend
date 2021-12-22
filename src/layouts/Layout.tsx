import { useSession } from 'next-auth/react'
import React from 'react'
import CardProfile from 'src/components/CardProfile/CardProfile'
import Category from 'src/components/Category/Category'
import { NavBar } from 'src/components/Nav/NavBar'
import WhoToFollow from 'src/components/WhoToFollow/WhoToFollow'
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

      <div className="flex flex-row items-start justify-center w-full gap-4 sm:mt-4 xl:gap-6 2xl:gap-8">
        {status === 'authenticated' && (
          <section
            className="w-full h-screen hidden min-w-minAside max-w-aside sticky top-16
            md:flex md:gap-4 md:flex-col md:overflow-y-auto
            lg:max-w-maxAside mx-auto"
          >
            <CardProfile />
            <article className="w-full relative bg-secondary rounded-xl">
              <h2 className="text-lg font-bold px-4 py-2">Categorys</h2>
              <hr className="border-textGray opacity-30" />
              <Category />
            </article>
          </section>
        )}
        <main
          className="w-full px-4 sm:px-0 gap-4
          sm:min-w-minPost sm:pr-4 md:pr-0 max-w-post mx-auto xl:max-w-maxPost 2xl:max-w-maxPost2xl relative"
        >
          {children ? children : <LoadingPage />}
        </main>
        <section className="hidden w-full max-w-aside min-w-minAside sticky top-16 lg:flex lg:flex-col lg:max-w-maxAside xl:mr-0 lg:gap-4">
          {status === 'authenticated' && <WhoToFollow />}
        </section>
      </div>
    </div>
  )
}
