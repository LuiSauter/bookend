import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { ALL_USERS } from 'src/users/graphql-queries'
import FollowItem from './FollowItem'
interface IUser {
  email: string;
  name: string;
  photo: string;
  username: string;
  user: string;
  verified: boolean;
}

const WhoToFollow = () => {
  const { data, loading } = useQuery(ALL_USERS)
  const [allUser, setAllUsers] = useState<IUser[]>([] as IUser[])

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
    <article className="w-full bg-secondary rounded-xl p-3 xl:p-4 relative">
      {loading ? (
        <span>Loading...</span>
      ) : (
        <ul className="flex w-full flex-col relative overflow-hidden">
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
        </ul>
      )}
    </article>
  )
}

export default WhoToFollow
