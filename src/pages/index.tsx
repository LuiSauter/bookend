import React from 'react'
import Head from 'next/head'

import Footer from 'src/components/Footer'
import Posts from 'src/components/Post'
import ClientOnly from 'src/components/ClientOnly'
import SearchBook from 'src/components/SearchBook'
import { useTranslate } from 'src/hooks/useTranslate'

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
        <Posts />
      </ClientOnly>
      <footer className='w-full py-4 mb-2 sm:mb-0 flex justify-center lg:hidden'>
        <Footer />
      </footer>
    </>
  )
}

// export async function getStaticProps() {
//   return {
//     props: {
//       users: []
//     }
//   }
// }

export default Home
