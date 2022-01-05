import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import MyProfile from 'src/components/Profile/MyProfile'
import MyPosts from 'src/components/Profile/MyPosts'
import ClientOnly from 'src/components/ClientOnly'

const Profile = () => {
  const router = useRouter()
  const { username } = router.query

  return (
    <>
      <Head>
        <title>Bookend | {username ? username : 'Loading...'}</title>
        <meta name="description" content={`${username}, profile in Bookend`} />
      </Head>
      <>
        <section
          className="relative w-full h-full rounded-xl py-4 mx-auto
            sm:min-w-minPost"
        >
          <header className="m-0 w-full z-0">
            <div className="bg-backgroundImageFronPage absolute top-0 w-full h-32 sm:h-36 md:h-44 rounded-lg"></div>
          </header>
          <ClientOnly>
            <MyProfile username={username} />
          </ClientOnly>
          <hr className="border-secondaryLigth/40 rounded-xl w-[90%] mx-auto mt-4 mb" />
        </section>
        <ClientOnly>
          <MyPosts />
        </ClientOnly>
      </>
    </>
  )
}
export default Profile
