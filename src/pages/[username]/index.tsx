import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useLazyQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { FIND_PROFILE } from 'src/users/graphql-queries'
import ProfileForm from 'src/components/ProfileForm/ProfileForm'
import { useSession } from 'next-auth/react'
import { checkVeriFied } from 'src/assets/icons'
const errorMessage =
  'Cannot return null for non-nullable field Query.findProfile.'

const Profile = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const { username } = router.query
  const [getProfile, { error, data, loading }] = useLazyQuery(FIND_PROFILE)
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
    router.push('/404')
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
          <ProfileForm
            profileData={data?.findProfile}
            onClick={handleEditProfile}
          />
        </>
      ) : (
        <section
          className="relative w-full h-full bg-secondary rounded-xl py-4 mx-auto
          sm:min-w-minPost"
        >
          <header className="m-0 w-full z-0">
            <div className="bg-backgroundImageFronPage absolute top-0 w-full h-32 sm:h-36 md:h-44 rounded-lg"></div>
          </header>
          <article className="w-full relative px-4">
            {data?.findProfile.me.email === session?.user?.email && (
              <button
                onClick={handleEditProfile}
                className="border rounded-2xl px-2 py-1 mx-auto hover:bg-secondaryLigth z-40"
              >
                Edit Profile
              </button>
            )}
            <figure className="mx-auto relative mt-6 z-auto sm:mt-11 md:mt-16 w-28 sm:w-full rounded-full border-4 border-secondary max-w-maxPhotoProfile overflow-hidden">
              {data?.findProfile && (
                <img
                  className="w-full rounded-full h-full z-auto relative"
                  src={data?.findProfile?.me.photo || '/default-user.webp'}
                  alt={data?.findProfile?.me.name}
                />
              )}
            </figure>
          </article>
          <div className="px-4">
            <h2 className="text-lg mt-2 font-bold flex items-center justify-start gap-1">
              {data?.findProfile?.me.name}
              {data?.findProfile?.verified && (
                <span title="Verified account">{checkVeriFied}</span>
              )}
            </h2>
            <span className="text-textGray text-base">
              @{data?.findProfile?.me.username}
            </span>
            <p className="my-3">{data?.findProfile?.description}</p>
            <div className="text-textGray flex flex-row flex-wrap">
              {data?.findProfile?.location && (
                <span className="mr-4">{data?.findProfile?.location}</span>
              )}
              {data?.findProfile?.website && (
                <Link href={`https://${data?.findProfile?.website}`}>
                  <a target="_blank" className="text-thirdBlue hover:underline">
                    {data?.findProfile?.website}
                  </a>
                </Link>
              )}
            </div>
            <div className="flex flex-row justify-start mt-3">
              <Link href="#">
                <a className="flex flex-row items-center justify-center mr-7 hover:bg-secondaryLigth rounded-xl px-2">
                  <span className="font-bold mr-1">
                    {data?.findProfile?.following.length}
                  </span>
                  <span className="text-textGray text-sm">Following</span>
                </a>
              </Link>
              <Link href="#">
                <a className="flex flex-row items-center justify-center hover:bg-secondaryLigth rounded-xl px-2">
                  <span className="font-bold mr-1">
                    {data?.findProfile?.followers.length}
                  </span>
                  <span className="text-textGray text-sm">Followers</span>
                </a>
              </Link>
            </div>
          </div>
        </section>
      )}
      <hr className="rounded-xl border-textGray my-3 w-11/12 mx-auto opacity-20" />
    </>
  )
}
export default Profile
