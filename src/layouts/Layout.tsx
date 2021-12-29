import React from 'react'
import { useSession } from 'next-auth/react'
import CardProfile from 'src/components/CardProfile/CardProfile'
import Category from 'src/components/Category/Category'
import WhoToFollow from 'src/components/WhoToFollow/WhoToFollow'
import { LoadingPage } from './LoadingPage'
import { NavBar } from 'src/components/Nav/NavBar'
import Footer from 'src/components/Footer'
import ClientOnly from 'src/components/ClientOnly'

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const Layout = ({ children }: Props) => {
  const { status } = useSession()
  return (
    <div
      className="relative bg-primary text-textWhite min-h-screen md:w-full flex flex-col m-auto selection:bg-cyan-400
      selection:text-cyan-900
      sm:flex-row sm:justify-center md:px-6
      md:flex-col md:justify-start 2xl:px-6"
    >
      {status === 'authenticated' && <NavBar />}

      <div
        className="flex flex-row items-start relative justify-center w-full gap-4 sm:mt-4 xl:gap-6
      2xl:gap-6 2xl:justify-between
      "
      >
        {status === 'authenticated' && (
          <section
            className="w-full h-full hidden min-w-minAside
            md:flex md:gap-0 md:flex-col md:overflow-y-visible pb-4
            max-w-maxAside sticky -top-72"
          >
            <ClientOnly>
              <CardProfile />
            </ClientOnly>
            <article className="w-full bg-secondary rounded-xl ">
              <h2 className="text-lg font-bold px-4 py-2">Categorys</h2>
              <hr className="border-textGray opacity-30" />
              <Category />
            </article>
          </section>
        )}
        <main
          className="w-full px-4 pb-8 sm:px-0 gap-4
          sm:min-w-minPost sm:pr-4 md:pr-0 max-w-post xl:mx-auto 2xl:m-0 xl:max-w-maxPost 2xl:max-w-none relative"
        >
          {children ? children : <LoadingPage />}
        </main>
        {status === 'authenticated' && (
          <section className="hidden w-full max-w-aside min-w-minAside sticky top-16  lg:flex lg:flex-col lg:max-w-maxAside xl:mr-0 lg:gap-4">
            <ClientOnly>
              <WhoToFollow />
            </ClientOnly>
            <Footer />
          </section>
        )}
      </div>
    </div>
  )
} //2xl:max-w-maxPost2xl
