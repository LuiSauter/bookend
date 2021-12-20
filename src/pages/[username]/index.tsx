import { useLazyQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { FIND_PROFILE } from 'src/users/graphql-queries'
import Head from 'next/head'
import ProfileForm from 'src/components/ProfileForm/ProfileForm'
import { useSession } from 'next-auth/react'
const errorMessage =
  'Cannot return null for non-nullable field Query.findProfile.'

const Profile = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const { username } = router.query
  const [getProfile, { error, data }] = useLazyQuery(FIND_PROFILE)
  const [editProfile, setEditProfile] = useState<boolean>(false)
  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      username && getProfile({ variables: { username } })
    }
    return () => {
      cleanup = false
    }
  }, [username])

  if (error?.message === errorMessage || data === null) {
    // router.push('/404')
  }
  const handleEditProfile = () => {
    setEditProfile(!editProfile)
  }
  return (
    <>
      <Head>
        <title>Bookend | {username ? username : 'Loading...'}</title>
        <meta name="description" content={`${username}, profile in Bookend`} />
      </Head>
      {editProfile ? (
        <>
          <button onClick={handleEditProfile}>{'< '}regresar</button>
          <ProfileForm profileData={data?.findProfile} />
        </>
      ) : (
        <section className="relative w-full">
          <div className="bg-backgroundImageFronPage w-full h-screen max-h-frontPage sm:rounded-lg"></div>
          <article>
            {data?.findProfile.me.email === session?.user?.email && (
              <button
                onClick={handleEditProfile}
                className="border rounded-lg px-2 py-1 absolute top-4 left-4 hover:bg-secondaryLigth"
              >
                Edit Profile
              </button>
            )}
            <figure className="m-0 rounded-full border-4 border-secondary max-w-maxPhotoProfile overflow-hidden absolute top-2/3 left-1/2">
              <img
                className="w-full rounded-full"
                src={data?.findProfile?.me.photo}
                alt={data?.findProfile?.me.name}
              />
            </figure>
          </article>
          <article className="mt-20">
            <h2>{data?.findProfile?.me.name}</h2>
          </article>
        </section>
      )}
    </>
  )
}
export default Profile
