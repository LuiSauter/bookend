import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { ALL_USERS } from 'src/users/graphql-queries'
import * as icons from 'src/assets/icons/index'
import BtnFollow from '../BtnFollow/BtnFollow'
import { useSession } from 'next-auth/react'
interface IUser {
  email: string;
  name: string;
  photo: string;
  username: string;
  user: string;
  verified: boolean;
}

const CarruselWhoToFollow = () => {
  const { data: session } = useSession()
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
    <>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <ul
          id='custom-scrollbar'
          className='flex flex-row snap-x snap-mandatory overflow-x-auto gap-12 relative'
        >
          {allUser.length !== 0 &&
            allUser.map(
              (user: IUser, index: number) =>
                session?.user?.email !== user.email && (
                  <li
                    key={index}
                    className='bg-secondary shrink-0 flex flex-col w-64 gap-4 snap-always snap-center rounded-xl p-4 mb-2'
                  >
                    <figure className='m-0 rounded-full w-28 mx-auto overflow-hidden'>
                      <img
                        src={user.photo}
                        alt={user.name}
                        className='w-full h-full'
                      />
                    </figure>
                    <div className='grid place-content-center'>
                      <h3 className='flex flex-row items-center justify-center'>
                        {user.name}
                        {user.verified && icons.checkVeriFied}
                      </h3>
                      <span className='text-center text-slate-500 text-sm'>
                        @{user.username}
                      </span>
                    </div>
                    <BtnFollow user={user.user} />
                  </li>
                )
            )}
        </ul>
      )}
    </>
  )
}

export default CarruselWhoToFollow
