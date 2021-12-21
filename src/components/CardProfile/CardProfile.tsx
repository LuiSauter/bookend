import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useLazyQuery, useQuery } from '@apollo/client'
import { useSession } from 'next-auth/react'
import { useProfileId } from 'src/hooks/useProfileId'
import { FIND_USER } from 'src/users/graphql-queries'

const CardProfile = () => {
  const { profile } = useProfileId()
  const { data: session, status } = useSession()
  const [getUser, { data, loading, error }] = useLazyQuery(FIND_USER)
  const [userState, setUserState] = useState<Profile>({} as Profile)
  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      if (profile !== 'undefined') {
        getUser({
          variables: { profile },
        })
      }
    }
    return () => {
      cleanup = false
    }
  }, [profile])


  return (
    <article className="bg-secondary w-full rounded-xl h-full flex flex-col items-center relative">
      {loading ? (
        'loading...'
      ) : (
        <>
          <header className="m-0 w-full relative">
            <div className="bg-backgroundImageFronPage absolute inset-0 w-full h-20 sm:rounded-lg"></div>
          </header>
          <img
            className="w-20 rounded-full m-auto mt-9 z-50"
            src={data?.findUser?.me.photo}
            alt={data?.findUser?.me.name}
          />
          <div className="text-center my-4 px-4">
            <h2 className="text-lg font-bold">{data?.findUser?.me.name}</h2>
            <h3 className="text-textGray">@{data?.findUser?.me.username}</h3>
            <p className="text-sm">{data?.findUser?.description}</p>
          </div>
          <div className="flex flex-row w-full justify-center border-t border-b border-textGray py-3">
            <Link href="#">
              <a className="flex flex-col items-center justify-center w-full">
                <span className="font-bold">
                  {data?.findUser?.following.length}
                </span>
                <span className="text-textGray text-sm">Following</span>
              </a>
            </Link>
            <span className="border-l border-textGray"></span>
            <Link href="#">
              <a className="flex flex-col items-center justify-center w-full">
                <span className="font-bold">
                  {data?.findUser?.followers.length}
                </span>
                <span className="text-textGray text-sm">Followers</span>
              </a>
            </Link>
          </div>
          <button className="text-sm text-thirdBlue font-medium py-2 hover:bg-secondaryLigth w-full rounded-b-lg">
            My Profile
          </button>
        </>
      )}
    </article>
  )
}

export default CardProfile
