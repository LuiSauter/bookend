import React, { useEffect, useState } from 'react'
import { useToggleUser } from 'src/hooks/useToggleUser'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useLazyQuery } from '@apollo/client'
import { FIND_USER } from 'src/users/graphql-queries'


const UserOfModal = () => {
  const { data: session, status } = useSession()
  const { dropdownOpen, handleToggleModal } = useToggleUser()
  const [dataProfile, setDataProfile] = useState<Profile | null>(null)
  const [getUserByEmail, { data, loading }] = useLazyQuery(FIND_USER)

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      if (status === 'authenticated') {
        getUserByEmail({ variables: { email: session?.user?.email } })
      }
    }
    return () => {
      cleanup = false
    }
  }, [status === 'authenticated'])

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      data?.findUser && setDataProfile(data?.findUser)
    }
    return () => {
      cleanup = false
    }
  }, [data?.findUser])

  const handleModalOut = () => {
    handleToggleModal()
  }
  return loading ? (
    <span>Loading...</span>
  ) : (
    <Link href={`/${dataProfile?.me.username}`}>
      <a
        onClick={handleModalOut}
        className="w-full hover:bg-secondaryLigth rounded-md py-1 px-4 flex items-center justify-center"
      >
        <img
          src={
            session?.user?.image ? session?.user?.image : '/default-user.webp'
          }
          className="w-8 rounded-full md:w-12 mr-4"
          alt={dataProfile?.me.name}
        />
        <div className="flex flex-col">
          <h2>{dataProfile?.me.name}</h2>
          <span className="text-sm text-gray-400">
            @{dataProfile?.me.username}
          </span>
          <span className="text-sm text-textGray">See your profile</span>
        </div>
      </a>
    </Link>
  )
}

export default UserOfModal
