import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { LoadingIcon } from 'src/assets/icons/LoadingIcon'
import { useTranslate } from 'src/hooks/useTranslate'
import { ALL_USERS } from 'src/users/graphql-queries'
import FollowItem from './FollowItem'
interface IUser {
  email: string
  name: string
  photo: string
  username: string
  user: string
  verified: boolean
}

const WhoToFollow = () => {
  const { data, loading } = useQuery(ALL_USERS, {
    ssr: true,
  })
  const [allUser, setAllUsers] = useState<IUser[]>([] as IUser[])
  const translate = useTranslate()

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      if (data?.allUsers) {
        setAllUsers(data?.allUsers)
      }
    }
    return () => {
      cleanup = false
    }
  }, [data?.allUsers])

  return (
    <>
      {loading ? (
        <div className='py-2'>
          <LoadingIcon />
        </div>
      ) : (
        <ul className='flex w-full flex-col overflow-x-auto relative overflow-hidden'>
          {allUser.length !== 0 &&
            allUser.map((user: IUser) => (
              <FollowItem
                key={user.user}
                name={user.name}
                email={user.email}
                photo={user.photo}
                user={user.user}
                username={user.username}
                verified={user.verified}
              />
            ))}
          <button className='text-center p-2 hover:text-textGray'>{translate.home.searchBook.showMore}</button>
        </ul>
      )}
    </>
  )
}

export default WhoToFollow