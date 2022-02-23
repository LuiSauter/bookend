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
        <meta name='description' content={`${username}, profile in Bookend`} />
      </Head>
      <>
        <section
          className='w-full h-full rounded-xl py-4 mx-auto
            sm:min-w-minPost'
        >
          <header className='m-0 w-full z-0'>
            <div className='bg-backgroundImageFronPage absolute top-12 md:top-0 w-full h-32 sm:h-36 md:h-44 rounded-lg'></div>
          </header>
          <ClientOnly>
            <MyProfile username={username} />
          </ClientOnly>
          <ClientOnly>
            <MyPosts username={username} />
          </ClientOnly>
        </section>
      </>
    </>
  )
}
export default Profile
