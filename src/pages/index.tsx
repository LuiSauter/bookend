import React from 'react'
import Head from 'next/head'

import Footer from 'src/components/Footer'

import AllPosts from 'src/components/Post/AllPosts'
import ClientOnly from 'src/components/ClientOnly'
import IsNewProfile from 'src/components/ProfileForm/IsNewProfile'

const Home = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Bookend | Inicio</title>
      </Head>
      <ClientOnly>
        <IsNewProfile />
      </ClientOnly>
      {/* <ClientOnly> */}
      <AllPosts />
      {/* </ClientOnly> */}
      <footer className='w-full py-4 mb-2 sm:mb-0 flex justify-center lg:hidden'>
        <Footer />
      </footer>
    </>
  )
}
export default Home
