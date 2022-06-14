/* eslint-disable @typescript-eslint/no-explicit-any */
import Head from 'next/head'
import React, { Fragment } from 'react'
import PulseUsers from 'src/assets/icons/esqueleton/PulseUsers'
import UsersItem from 'src/components/SearchResults/UsersItem'
import { useStaticUsers } from 'src/hooks/useStaticUsers'
import { useTranslate } from 'src/hooks/useTranslate'
import { IUser } from 'src/interfaces/Users'

const Users = () => {
  const translate = useTranslate()
  const sortFunction = (a: IUser | any, b: IUser | any): number =>
    a.verified === b.verified ? 0 : a.verified ? -1 : 1
  const { userState } = useStaticUsers()

  return (
    <Fragment>
      <Head>
        <title>Bookend | Best users</title>
      </Head>
      <section>
        <h2 className='text-2xl font-bold px-4 pt-4 sm:py-3 sm:px-0 xl:pl-4'>
          {translate.profile.users} ·{' '}
          {userState.users ? userState.users.length : 'empty'}
        </h2>
        {userState.users ? (
          Object.values(userState.users)
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
        ) : (
          <PulseUsers n={6} paddingY='py-5' size='h-12 w-12' font='h-2' />
        )}
      </section>
    </Fragment>
  )
}

export default Users