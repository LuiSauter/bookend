import { useLazyQuery, useMutation } from '@apollo/client'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { LOGINQL } from 'src/login/graphql-mutations'
import { ALL_USERS, FIND_USER } from 'src/users/graphql-queries'
import ProfileForm from './ProfileForm'

const IsNewProfile = () => {
  const { data: session, status } = useSession()
  const [updateProfile, setUpdateProfile] = useState<boolean>(true)
  const [getProfile, { data: findData }] = useLazyQuery(FIND_USER)
  const [getLogin, { data }] = useMutation(LOGINQL, {
    refetchQueries: [
      { query: FIND_USER, variables: { email: session?.user?.email } },
      { query: ALL_USERS },
    ],
  })


  const handleClickArrowLeft = () => {
    setUpdateProfile(!updateProfile)
  }

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
  return (
    <>
      {data?.signin &&
        data?.signin?.message === 'signup' &&
        updateProfile &&
        findData?.findUser && (
        <ProfileForm
          profileData={findData?.findUser}
          onClick={handleClickArrowLeft}
        />
      )}
    </>
  )
}

export default IsNewProfile
