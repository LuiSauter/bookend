import React from 'react'
import Head from 'next/head'

import Footer from 'src/components/Footer'
import ClientOnly from 'src/components/ClientOnly'
import SearchBook from 'src/components/SearchBook'
import { useTranslate } from 'src/hooks/useTranslate'
import dynamic from 'next/dynamic'
import { PulsePosts } from 'src/assets/icons/esqueleton/PulsePosts'

const DynamicComponent = dynamic(() => import('src/components/Post'), {
  loading: () => (
    <PulsePosts n={2} paddingY='py-4' size='h-12 w-12' font='h-2' />
  ),
})

const Home = (): JSX.Element => {

  const translate = useTranslate()
  return (
    <>
      <Head>
        <title>Bookend 📚 | {translate.home.titleSEO}</title>
      </Head>
      <section className='px-4 sm:pb-4 sm:pt-0 sm:px-0 pt-4'>
        <ClientOnly>
          <SearchBook />
        </ClientOnly>
      </section>
      <ClientOnly>
        <DynamicComponent />
      </ClientOnly>
      <footer className='w-full py-4 mb-2 sm:mb-0 flex md:hidden justify-center lg:hidden'>
        <Footer />
      </footer>
    </>
  )
}

export default Home
