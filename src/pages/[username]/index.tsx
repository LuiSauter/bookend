import React, { useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import MyProfile from 'src/components/Profile/MyProfile'
import MyPosts from 'src/components/Profile/MyPosts'
import ClientOnly from 'src/components/ClientOnly'
import { useLazyQuery, useQuery } from '@apollo/client'
import { FIND_PROFILE, GET_DOMINANT_COLOR } from 'src/users/graphql-queries'
import { useDominanColor } from 'src/hooks/useDominantColor'

const Profile = () => {
  const router = useRouter()
  const { username } = router.query

  const { data } = useQuery(FIND_PROFILE, { variables: { username: username } })

  const [getDominantColor, { data: dataColor }] =
    useLazyQuery(GET_DOMINANT_COLOR)

  useEffect(() => {
    let monted = true
    if (monted) {
      data?.findProfile.me.photo &&
        getDominantColor({ variables: { image: data?.findProfile.me.photo } })
    }
    return () => {
      monted = false
    }
  }, [data?.findProfile])

  const { dominantColor } = useDominanColor(dataColor?.getColors)

  return (
    <>
      <Head>
        <title>Bookend | {username ? username : 'Loading...'}</title>
        <meta name='description' content={`${username}, profile in Bookend`} />
      </Head>
      <>
        <section
          className='w-full h-full rounded-xl py-4 mx-auto
            sm:md:min-w-[430px]'
        >
          <header className='m-0 w-full z-0'>
            <div
              style={{
                backgroundColor: dominantColor,
              }}
              className='bg-backgroundImageFronPage absolute top-12 md:top-0 w-full h-32 sm:h-36 md:h-44'
            />
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
