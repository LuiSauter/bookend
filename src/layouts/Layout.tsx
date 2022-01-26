import React from 'react'
import CardProfile from 'src/components/CardProfile/CardProfile'
import Category from 'src/components/Category/Category'
import WhoToFollow from 'src/components/WhoToFollow/WhoToFollow'
import { LoadingPage } from './LoadingPage'
import { NavBar } from 'src/components/Nav/NavBar'
import Footer from 'src/components/Footer'
import ClientOnly from 'src/components/ClientOnly'
import SearchUser from 'src/components/SearchUser'
import { PhotoUser } from 'src/components/Nav/PhotoUser'
import { useRouter } from 'next/router'
import * as icons from 'src/assets/icons'

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const Layout = ({ children }: Props) => {
  const router = useRouter()
  return (
    <div
      className=' bg-primary text-textWhite min-h-screen md:w-full flex flex-col m-auto selection:bg-cyan-400
      selection:text-cyan-900
      sm:flex-row sm:justify-center
      md:flex-col md:justify-start scroll-smooth'
    >
      <div
        className='flex flex-row items-start justify-center w-full gap-4 xl:gap-6 md:px-4 lg:px-6 2xl:px-8
        2xl:gap-6 xl:justify-center scroll-smooth'
      >
        <section
          className='hidden min-w-[270px] max-w-maxAside sticky top-0
          xl:flex flex-col gap-4 h-[100vh] snap-proximity snap-y overflow-y-auto overflow-x-hidden'
        >
          <div
            onClick={() => router.push('/')}
            className='hidden md:flex gap-3 justify-center md:items-center relative bg-transparent cursor-pointer hover:opacity-90 transition-opacity h-14 py-4'
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
          <div
            className='xl:flex flex-col snap-proximity snap-y overflow-y-auto pb-4 pr-1'
            id='custom-scrollbar'
          >
            <ClientOnly>
              <CardProfile />
            </ClientOnly>
            <article className='w-full snap-normal shrink-0 bg-secondary rounded-xl overflow-auto'>
              <h2 className='text-lg font-bold px-4 py-2'>Categorys</h2>
              <hr className='border-textGray opacity-30' />
              <Category />
            </article>
          </div>
        </section>
        <main
          className='w-full pb-8 sm:px-0 gap-4
          sm:pr-4 md:pr-0 2xl:m-0 relative max-w-[700px] sm:flex md:flex-col'
        >
          <NavBar />
          <div className='flex flex-col relative w-full'>
            {children ? children : <LoadingPage />}
          </div>
        </main>
        <section className='hidden w-full min-w-minAside sticky z-[3] top-0 md:flex flex-col max-w-maxAside xl:mr-0 gap-4'>
          <PhotoUser />
          <ClientOnly>
            <SearchUser />
          </ClientOnly>
          <article className='w-full bg-secondary rounded-xl p-3 xl:p-4'>
            <ClientOnly>
              <WhoToFollow />
            </ClientOnly>
          </article>
          <Footer />
        </section>
      </div>
    </div>
  )
} //2xl:max-w-maxPost2xl
