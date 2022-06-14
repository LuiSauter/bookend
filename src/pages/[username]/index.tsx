import React from 'react'
import Head from 'next/head'
import { ALL_USERS, FIND_PROFILE, GET_DOMINANT_COLOR } from 'src/users/graphql-queries'
import { useDominanColor } from 'src/hooks/useDominantColor'
import { GraphqlApolloCLient } from 'src/data/ApolloClient'
import MyProfile from 'src/components/Profile/MyProfile'
import ClientOnly from 'src/components/ClientOnly'
import MyPosts from 'src/components/Profile/MyPosts'
import { IUser } from 'src/interfaces/Users'

interface Props {
  user: { findProfile: Profile } | null
  dataColor?: string
  username: string
  users: { allUsers: IUser[] }
}

interface StaticProps {params: { username: string }}

const Profile = ({ username, dataColor, user }: Props) => {
  const { dominantColor } = useDominanColor(dataColor)
  return (
    <>
      <Head>
        <title>Bookend | {username ? username : 'Loading...'}</title>
        <meta name='description' content={`${username}, profile in Bookend`} />
      </Head>
      <section className='w-full h-full rounded-xl py-4 mx-auto sm:md:min-w-[430px]'>
        <header className='m-0 w-full z-0'>
          <div
            style={{
              backgroundColor: dominantColor ? dominantColor : 'rgb(21,32,43)',
            }}
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
        revalidate: 1,
      }
    }
    const { data: dataColor } = await client.query({
      query: GET_DOMINANT_COLOR,
      variables: { image: data.findProfile.me.photo },
    })
    return {
      props: {
        user: data,
        dataColor: dataColor?.getColors,
        username: params.username,
      },
      revalidate: 1,
    }
  } catch (error) {
    return {
      notFound: true,
      revalidate: 1,
    }
  }
}

export async function getStaticPaths() {
  try {
    const client = GraphqlApolloCLient()
    const { data } = await client.query({ query: ALL_USERS })
    const paths = data?.allUsers.map((user: IUser) => ({
      params: { username: user.username },
    }))

    return {
      paths: paths,
      fallback: 'blocking',
    }
  } catch (error) {
    return {
      paths: [{}],
      fallback: false,
    }
  }
}