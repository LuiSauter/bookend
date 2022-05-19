import React, { useEffect } from 'react'
import Head from 'next/head'
import { ALL_USERS, FIND_PROFILE, GET_DOMINANT_COLOR } from 'src/users/graphql-queries'
import { useDominanColor } from 'src/hooks/useDominantColor'
import { GraphqlApolloCLient } from 'src/data/ApolloClient'
import MyProfile from 'src/components/Profile/MyProfile'
import ClientOnly from 'src/components/ClientOnly'
import MyPosts from 'src/components/Profile/MyPosts'
import { useStaticUsers } from 'src/hooks/useStaticUsers'
import { IUser } from 'src/interfaces/Users'

interface Props {
  user: { findProfile: Profile } | null
  dataColor?: string
  username: string
  users: { allUsers: IUser[] }
}

interface StaticProps {params: { username: string }}

const Profile = ({ username, dataColor, user, users }: Props) => {
  const { dominantColor } = useDominanColor(dataColor)
  const { addUsers } = useStaticUsers()
  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      users && addUsers(users?.allUsers)
    }
    return () => {
      cleanup = false
    }
  }, [users])

  return (
    <>
      <Head>
        <title>Bookend | {username ? username : 'Loading...'}</title>
        <meta name='description' content={`${username}, profile in Bookend`} />
      </Head>
      <section className='w-full h-full rounded-xl py-4 mx-auto sm:md:min-w-[430px]'>
        <header className='m-0 w-full z-0'>
          <div
            style={{ backgroundColor: dominantColor }}
            className='bg-backgroundImageFronPage absolute top-12 md:top-0 w-full h-32 sm:h-36 md:h-44'
          />
        </header>
        {user?.findProfile && (
          <>
            <MyProfile user={user?.findProfile} />
            <ClientOnly>
              <MyPosts user={user?.findProfile} />
            </ClientOnly>
          </>
        )}
      </section>
    </>
  )
}
export default Profile

export async function getStaticPaths() {
  const client = GraphqlApolloCLient()
  const { data } = await client.query({ query: ALL_USERS })
  const users: IUser[] = []
  data?.allUsers.forEach((user:IUser) => {
    users.push({...user, username: user.username })
  })
  const paths = users.map((user) => ({ params: { username: user.username } }))
  return {
    paths: paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }: StaticProps) {
  try {
    const client = GraphqlApolloCLient()
    const { data } = await client.query({
      query: FIND_PROFILE,
      variables: { username: params.username },
    })
    if (!data.findProfile) {
      return {
        notFound: true,
      }
    }
    const { data: dataColor } = await client.query({
      query: GET_DOMINANT_COLOR,
      variables: { image: data.findProfile.me.photo },
    })
    const { data: allUsers } = await client.query({ query: ALL_USERS })
    return {
      props: {
        user: data,
        dataColor: dataColor?.getColors,
        username: params.username,
        users: allUsers,
      },
      revalidate: 5,
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}
