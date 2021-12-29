import React from 'react'
import Head from 'next/head'

import Footer from 'src/components/Footer'

import AllPosts from 'src/components/Post/AllPosts'
import ClientOnly from 'src/components/ClientOnly'
import IsNewProfile from 'src/components/ProfileForm/IsNewProfile'
import LoginModal from 'src/components/LoginModal'
import { useToggleUser } from 'src/hooks/useToggleUser'

const Home = (): JSX.Element => {
  const { loginOpen } = useToggleUser()
  return (
    <>
      <Head>
        <title>Bookend | Inicio</title>
      </Head>
      <ClientOnly>
        <IsNewProfile />
      </ClientOnly>
      <ClientOnly>
        <AllPosts />
      </ClientOnly>
      {loginOpen && (
        <ClientOnly>
          <LoginModal />
        </ClientOnly>
      )}
      <footer className="w-full py-4 flex justify-center lg:hidden">
        <Footer />
      </footer>
    </>
  )
}
export default Home
