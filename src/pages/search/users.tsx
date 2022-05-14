/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@apollo/client'
import Head from 'next/head'
import React, { Fragment } from 'react'
import { LoadingIcon } from 'src/assets/icons/LoadingIcon'
import UsersItem from 'src/components/SearchResults/UsersItem'
import { IUser } from 'src/components/SearchUser'
import { useTranslate } from 'src/hooks/useTranslate'
import { ALL_USERS } from 'src/users/graphql-queries'

const Users = () => {
  const translate = useTranslate()
  const { data, loading } = useQuery(ALL_USERS)

  const sortFunction = (a: IUser | any, b: IUser | any): number =>
    a.verified === b.verified ? 0 : a.verified ? -1 : 1

  return (
    <Fragment>
      <Head>
        <title>Bookend | All users</title>
      </Head>
      <section>
        <h2 className='text-2xl font-bold px-4 pt-4 sm:py-3 sm:px-0 xl:pl-4'>
          {translate.profile.users} ·{' '}
          {data?.allUsers ? data?.allUsers.length : 'empty'}
        </h2>
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
    </Fragment>
  )
}

export default Users