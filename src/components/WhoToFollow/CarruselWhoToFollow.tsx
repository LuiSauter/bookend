import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useQuery } from '@apollo/client'
import { ALL_USERS } from 'src/users/graphql-queries'
import * as icons from 'src/assets/icons/index'
import BtnFollow from '../Button/BtnFollow'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { LoadingIcon } from 'src/assets/icons/LoadingIcon'
import PhotoUser from '../User/PhotoUser'
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
  const { data, loading } = useQuery(ALL_USERS, { ssr: true })
  const [allUser, setAllUsers] = useState<IUser[]>([] as IUser[])
  const router = useRouter()

  let subscribe = true
  useEffect(() => {
    subscribe && data?.allUsers && setAllUsers(data?.allUsers)
    return () => {
      subscribe = false
    }
  }, [data?.allUsers])

  return (
    <>
      {loading ? (
        <LoadingIcon />
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
                    onClick={(event) => {
                      event.stopPropagation()
                      router.push(`/${user.username}`)
                    }}
                    className='dark:bg-secondary bg-slate-200 dark:hover:bg-secondaryLigth hover:bg-sky-200/70 shrink-0 flex flex-col w-56 gap-4 snap-always snap-center rounded-xl p-4 mb-2 cursor-pointer'
                  >
                    <figure className='m-0 rounded-full w-20 h-20 mx-auto overflow-hidden relative'>
                      <PhotoUser
                        nameAlt={user.name}
                        photoURL={user.photo}
                        styles='rounded-full'
                        placeholder={true}
                      />
                    </figure>
                    <Link href={`/${user.username}`}>
                      <a className='grid place-content-center'>
                        <h3 className='flex flex-row items-center justify-center'>
                          {user.name}
                          {user.verified && icons.checkVeriFied}
                        </h3>
                        <span
                          translate='no'
                          className='text-center text-slate-500 text-sm'
                        >
                          @{user.username}
                        </span>
                      </a>
                    </Link>
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
