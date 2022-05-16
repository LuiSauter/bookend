import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { useTranslate } from 'src/hooks/useTranslate'
import { ALL_USERS } from 'src/users/graphql-queries'
import FollowItem from './FollowItem'
import PulseUsers from 'src/assets/icons/esqueleton/PulseUsers'
import { IUser } from 'src/interfaces/Users'

const WhoToFollow = () => {
  const router = useRouter()
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
        <PulseUsers size='h-11 w-11' n={5} font='h-2' paddingY='py-2' />
      ) : (
        <ul className='flex w-full flex-col overflow-x-auto relative overflow-hidden'>
          {allUser.length !== 0 &&
            allUser.map(
              (user: IUser) =>
                user.verified && (
                  <FollowItem
                    key={user.user}
                    name={user.name}
                    email={user.email}
                    photo={user.photo}
                    user={user.user}
                    username={user.username}
                    verified={user.verified}
                  />
                )
            )}
        </ul>
      )}
      <button
        onClick={() => router.push('/search/users')}
        className='text-center w-full p-2 dark:text-slate-400 text-slate-700 dark:hover:text-slate-400/50 hover:text-thirdBlue transition-colors'
      >
        {translate.home.searchBook.showMore}
      </button>
    </>
  )
}

export default WhoToFollow