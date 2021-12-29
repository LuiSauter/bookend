import { useLazyQuery } from '@apollo/client'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { useProfileId } from 'src/hooks/useProfileId'
import { FIND_USER } from 'src/users/graphql-queries'

const Name = () => {
  const { data: session, status } = useSession()
  const [dataProfile, setDataProfile] = useState<Profile | null>(null)
  const { setProfileId, profile } = useProfileId()
  const [getUserByProfileId, { data, loading }] = useLazyQuery(FIND_USER)

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      if (status === 'authenticated') {
        getUserByProfileId({ variables: { email: session?.user?.email } })
      }
    }
    return () => {
      cleanup = false
    }
  }, [status === 'authenticated'])


  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      if (profile === 'undefined' || profile === '') {
        setProfileId(data?.findUser?.me.username)
      }
      localStorage.setItem('profileUser', data?.findUser?.me.username)
      data?.findUser && setDataProfile(data?.findUser)
    }
    return () => {
      cleanup = false
    }
  }, [data?.findUser])

  return loading ? (
    <span>Loading...</span>
  ) : (
    <span className="text-xs whitespace-nowrap w-full text-textWhite px-2 hidden md:flex">
      {dataProfile?.me.name ? dataProfile?.me.name : <span>loading...</span>}
    </span>
  )
}

export default Name
