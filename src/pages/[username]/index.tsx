import React from 'react'
import Head from 'next/head'
import { FIND_PROFILE, GET_DOMINANT_COLOR } from 'src/users/graphql-queries'
import { useDominanColor } from 'src/hooks/useDominantColor'
import { GraphqlApolloCLient } from 'src/data/ApolloClient'
import MyProfile from 'src/components/Profile/MyProfile'
import { useRouter } from 'next/router'
import ClientOnly from 'src/components/ClientOnly'
import MyPosts from 'src/components/Profile/MyPosts'

interface Props {
  user: any | null
  dataColor?: string
  username: string
}

interface StaticProps {
  params: {
    username: string
  }
}

const Profile = ({ user, dataColor, username }: Props) => {
  const { dominantColor } = useDominanColor(dataColor)

  return (
    <>
      <Head>
        <title>Bookend | {username ? username : 'Loading...'}</title>
        <meta name='description' content={`${username}, profile in Bookend`} />
      </Head>
      <section
        className='w-full h-full rounded-xl py-4 mx-auto
            sm:md:min-w-[430px]'
      >
        <header className='m-0 w-full z-0'>
          <div
            style={{ backgroundColor: dominantColor }}
            className='bg-backgroundImageFronPage absolute top-12 md:top-0 w-full h-32 sm:h-36 md:h-44'
          />
        </header>
        {user?.data.findProfile && (
          <>
            <MyProfile user={user?.data.findProfile} />
            <ClientOnly>
              <MyPosts user={user?.data.findProfile} />
            </ClientOnly>
          </>
        )}
      </section>
    </>
  )
}
export default Profile

export async function getStaticPaths() {
  return {
    paths: [{ params: { username: '1' } }],
    fallback: true,
  }
}

export async function getStaticProps({ params }: StaticProps) {
  const client = GraphqlApolloCLient()
  const user = await client.query({
    query: FIND_PROFILE,
    variables: { username: params.username },
  })
  if (!user?.data.findProfile) {
    return {
      notFound: true,
    }
  }
  const { data: dataColor } = await client.query({
    query: GET_DOMINANT_COLOR,
    variables: { image: user?.data.findProfile.me.photo },
  })
  return {
    props: {
      user,
      dataColor: dataColor?.getColors,
      username: params.username,
    },
  }
}
