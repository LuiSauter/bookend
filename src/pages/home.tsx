import React, { useEffect, useState } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'
import { useSession } from 'next-auth/react'
import Head from 'next/head'

import Footer from 'src/components/Footer'
import ProfileForm from 'src/components/ProfileForm/ProfileForm'

import { LOGINQL } from 'src/login/graphql-mutations'
import { ALL_USERS, FIND_USER } from 'src/users/graphql-queries'
import AllPosts from 'src/components/Post/AllPosts'
import ClientOnly from 'src/components/ClientOnly'

const Home = (): JSX.Element => {
  const { data: session, status } = useSession()
  const [getLogin, { data }] = useMutation(LOGINQL, {
    refetchQueries: [
      { query: FIND_USER, variables: { email: session?.user?.email } },
      { query: ALL_USERS },
    ],
  })
  const [getProfile, { data: findData }] = useLazyQuery(FIND_USER)
  const [updateProfile, setUpdateProfile] = useState<boolean>(true)

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      if (status === 'authenticated') {
        getLogin({
          variables: {
            name: session?.user?.name,
            email: session?.user?.email,
            image: session?.user?.image,
          },
        })
      }
    }
    return () => {
      cleanup = false
    }
  }, [status === 'authenticated'])

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      if (session?.user?.email) {
        getProfile({ variables: { email: session?.user?.email } })
      }
    }
    return () => {
      cleanup = false
    }
  }, [data?.signin])

  const handleClickArrowLeft = () => {
    setUpdateProfile(!updateProfile)
  }

  return (
    <>
      <Head>
        <title>Bookend | home</title>
      </Head>
      {data?.signin && data?.signin?.message === 'signup' ? (
        updateProfile && (
          <ClientOnly>
            {findData?.findUser && (
              <ProfileForm
                profileData={findData?.findUser}
                onClick={handleClickArrowLeft}
              />
            )}
          </ClientOnly>
        )
      ) : (
        <>
          <ClientOnly>
            <AllPosts />
          </ClientOnly>
          <footer className="w-full py-4 flex justify-center lg:hidden">
            <Footer />
          </footer>
        </>
      )}
    </>
  )
}
export default Home
