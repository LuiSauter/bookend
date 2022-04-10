import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ClientOnly from 'src/components/ClientOnly'

import { LoadingPage } from './LoadingPage'
import { PhotoUser } from 'src/components/Nav/PhotoUser'
import { NavBar } from 'src/components/Nav/NavBar'
import CardProfile from 'src/components/CardProfile/CardProfile'
import Category from 'src/components/Category/Category'
import WhoToFollow from 'src/components/WhoToFollow/WhoToFollow'
import Footer from 'src/components/Footer'
import SearchUser from 'src/components/SearchUser'
import * as icons from 'src/assets/icons'
import { useTranslate } from 'src/hooks/useTranslate'

interface Props {
  children: JSX.Element | JSX.Element[]
}

export const Layout = ({ children }: Props) => {
  const router = useRouter()
  const translate = useTranslate()

  const handleBack = () => {
    history.length <= 2 ? router.push('/') : router.back()
  }

  return (
    <div
      className=' dark:bg-primary bg-white dark:text-textWhite min-h-screen md:w-full flex flex-col m-auto selection:bg-cyan-400
      selection:text-cyan-900
      sm:flex-row sm:justify-center
      md:flex-col md:justify-start scroll-smooth'
    >
      <div
        className='flex flex-row items-start justify-center w-full gap-4 xl:gap-4 md:px-4 lg:px-4 2xl:px-4
        2xl:gap-6 xl:justify-center scroll-smooth'
      >
        <section
          className='hidden min-w-[310px] max-w-[330px] sticky top-0
          xl:flex flex-col gap-4 h-[100vh] snap-proximity snap-y overflow-y-auto overflow-x-hidden border-r-2 border-textGray/20'
        >
          <div
            className='xl:flex w-full flex-col snap-proximity snap-y overflow-y-auto pb-4 pr-4'
            id='custom-scrollbar'
          >
            <Link href='/'>
              <a className='hidden snap-start shrink-0 w-full md:flex gap-3 justify-center md:items-center relative bg-transparent cursor-pointer hover:opacity-90 transition-opacity h-14 pt-0'>
                <img
                  className='w-8 h-auto'
                  src='/images/bookend-logo.png'
                  alt='bookend'
                />
                <h1
                  translate='no'
                  className='text-2xl font-medium font-mono hidden lg:block'
                >
                  Bookend
                </h1>
                {router.query.username && (
                  <button
                    className='rounded-full dark:hover:bg-secondaryLigth/50 hover:bg-sky-200/70 flex flex-shrink-0 h-10 w-10 items-center justify-center'
                    onClick={handleBack}
                  >
                    {icons.arrowLeft}
                  </button>
                )}
              </a>
            </Link>
            <ClientOnly>
              <article className='flex relative w-full justify-center snap-none shrink-0 pt-4'>
                <CardProfile />
              </article>
            </ClientOnly>
            <article className='w-full snap-center shrink-0 dark:bg-secondary bg-slate-200 border border-textGray/10 rounded-xl overflow-auto'>
              <h2 className='text-lg font-bold px-4 py-2'>
                {translate.home.category}
              </h2>
              <hr className='border-textGray/10' />
              <Category />
            </article>
          </div>
        </section>
        <main
          className='w-full pb-8 sm:px-0 gap-4
          sm:pr-4 md:pr-0 2xl:m-0 relative md:min-w-[430px] max-w-[600px] sm:flex md:flex-col'
        >
          <NavBar />
          <div className='flex flex-col relative w-full'>
            {children ? children : <LoadingPage />}
          </div>
        </main>
        <section
          className='xl:flex snap-proximity snap-y overflow-y-auto overflow-x-hidden
        hidden h-screen w-full min-w-minAside sticky z-[70] top-0 md:flex flex-col max-w-[340px] xl:mr-0 gap-4 border-l-2 border-textGray/20 pl-4'
        >
          <div
            className='xl:flex w-full flex-col snap-proximity snap-y overflow-y-auto pb-4'
            id='custom-scrollbar-none'
          >
            <PhotoUser />
            <ClientOnly>
              <SearchUser />
            </ClientOnly>
            <article className='w-full snap-center shrink-0 dark:bg-secondary bg-slate-200 border border-textGray/10 rounded-xl'>
              <h2 className='px-4 py-2 text-lg font-semibold'>
                {translate.home.whoToFollow}
              </h2>
              <ClientOnly>
                <WhoToFollow />
              </ClientOnly>
            </article>
            <Footer />
          </div>
        </section>
      </div>
    </div>
  )
}
