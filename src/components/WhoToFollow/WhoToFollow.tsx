import { useRouter } from 'next/router'
import React from 'react'
import { useTranslate } from 'src/hooks/useTranslate'
import FollowItem from './FollowItem'
import PulseUsers from 'src/assets/icons/esqueleton/PulseUsers'
import { IUser } from 'src/interfaces/Users'
import { useStaticUsers } from 'src/hooks/useStaticUsers'

const WhoToFollow = () => {
  const router = useRouter()
  const { userState } = useStaticUsers()
  const translate = useTranslate()

  return (
    <>
      {userState.users.length === 0 ? (
        <PulseUsers size='h-11 w-11' n={5} font='h-2' paddingY='py-2' />
      ) : (
        <ul className='flex w-full flex-col overflow-x-auto relative overflow-hidden'>
          {userState.users.length !== 0 &&
            userState.users.map(
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