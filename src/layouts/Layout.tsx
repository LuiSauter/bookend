import React from 'react'
import CardProfile from 'src/components/CardProfile/CardProfile'
import Category from 'src/components/Category/Category'
import WhoToFollow from 'src/components/WhoToFollow/WhoToFollow'
import { LoadingPage } from './LoadingPage'
import { NavBar } from 'src/components/Nav/NavBar'
import Footer from 'src/components/Footer'
import ClientOnly from 'src/components/ClientOnly'
// import ClientOnly from 'src/components/ClientOnly'

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const Layout = ({ children }: Props) => {
  return (
    <div
      className=' bg-primary text-textWhite min-h-screen md:w-full flex flex-col m-auto selection:bg-cyan-400
      selection:text-cyan-900
      sm:flex-row sm:justify-center
      md:flex-col md:justify-start'
    >
      <NavBar />
      <div
        className='flex flex-row items-start justify-center w-full gap-4 sm:mt-4 xl:gap-6 md:px-4 lg:px-6 2xl:px-8
        2xl:gap-6 2xl:justify-between'
      >
        <section
          className='hidden min-w-[270px] sticky top-16 scrollbar:bg-transparent
          xl:flex flex-col h-[90vh] snap-proximity snap-y overflow-y-auto pb-4 pr-3'
          id='custom-scrollbar'
        >
          <ClientOnly>
            <CardProfile />
          </ClientOnly>
          <article className='w-full snap-center shrink-0 bg-secondary rounded-xl overflow-auto'>
            <h2 className='text-lg font-bold px-4 py-2'>Categorys</h2>
            <hr className='border-textGray opacity-30' />
            <Category />
          </article>
        </section>
        <main
          className='w-full pb-8 sm:px-0 gap-4
          sm:pr-4 md:pr-0 xl:mx-auto 2xl:m-0 relative'
        >
          {children ? children : <LoadingPage />}
        </main>
        <section className='hidden w-full max-w-aside min-w-minAside sticky top-16  md:flex flex-col lg:max-w-maxAside xl:mr-0 lg:gap-4'>
          <article className='w-full bg-secondary rounded-xl p-3 xl:p-4'>
            {/* <ClientOnly> */}
            <WhoToFollow />
            {/* </ClientOnly> */}
          </article>
          <Footer />
        </section>
      </div>
    </div>
  )
} //2xl:max-w-maxPost2xl
