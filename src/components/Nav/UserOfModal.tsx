import React, { useEffect } from 'react'
import { useToggleUser } from 'src/hooks/useToggleUser'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useLazyQuery } from '@apollo/client'
import { FIND_USER } from 'src/users/graphql-queries'
import { LoadingIcon } from 'src/assets/icons/LoadingIcon'

const UserOfModal = () => {
  const { data: session, status } = useSession()
  const { handleToggleModal } = useToggleUser()
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

  const handleModalOut = () => {
    handleToggleModal()
  }
  return loading ? (
    <LoadingIcon />
  ) : (
    <Link href={`/${data?.findUser?.me.username}`}>
      <a
        onClick={handleModalOut}
        className='w-full hover:bg-secondaryLigth transition-all rounded-md py-1 px-4 flex items-center justify-center'
      >
        <img
          src={
            session?.user?.image ? session?.user?.image : '/default-user.webp'
          }
          className='w-8 rounded-full md:w-12 mr-4'
          alt={data?.findUser?.me.name}
        />
        <div className='flex flex-col'>
          <h2>{data?.findUser?.me.name}</h2>
          <span className='text-sm text-gray-400'>
            @{data?.findUser?.me.username}
          </span>
          <span className='text-sm text-textGray'>See your profile</span>
        </div>
      </a>
    </Link>
  )
}

export default UserOfModal
