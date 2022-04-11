import { useQuery } from '@apollo/client'
import React from 'react'
import { LoadingIcon } from 'src/assets/icons/LoadingIcon'
import UsersItem from 'src/components/SearchResults/UsersItem'
import { IUser } from 'src/components/SearchUser'
import { useTranslate } from 'src/hooks/useTranslate'
import { ALL_USERS } from 'src/users/graphql-queries'
import * as icons from 'src/assets/icons'
import { useRouter } from 'next/router'

const Users = () => {
  const translate = useTranslate()
  const router = useRouter()
  const { data, loading } = useQuery(ALL_USERS)

  const sortFunction = (a: IUser | any, b: IUser | any): number =>
    a.verified === b.verified ? 0 : a.verified ? -1 : 1

  const handleBack = () => {
    history.length <= 2 ? router.push('/') : router.back()
  }

  return (
    <section>
      <header className='flex items-center py-4 px-2 md:pt-0'>
        <button
          onClick={handleBack}
          className='rounded-full dark:hover:bg-secondaryLigth/80 hover:bg-sky-200/70 p-2'
        >
          {icons.arrowLeft}
        </button>
        <h2 className='font-bold text-2xl pl-4'>{translate.display.title}</h2>
      </header>
      {loading ? (
        <LoadingIcon height='h-[80vh]' />
      ) : (
        data?.allUsers &&
        Object.values(data?.allUsers)
          .sort(sortFunction)
          .map((user: IUser | any, index: number) => (
            <UsersItem
              key={index}
              photo={user.photo}
              username={user.username}
              name={user.name}
              verified={user.verified}
              email={user.email}
              user={user.user}
              description={user.description}
            />
          ))
      )}
    </section>
  )
}

export default Users