/* eslint-disable @typescript-eslint/no-explicit-any */
import Head from 'next/head'
import React, { Fragment, useEffect } from 'react'
import UsersItem from 'src/components/SearchResults/UsersItem'
import { GraphqlApolloCLient } from 'src/data/ApolloClient'
import { useStaticUsers } from 'src/hooks/useStaticUsers'
import { useTranslate } from 'src/hooks/useTranslate'
import { IUser } from 'src/interfaces/Users'
import { ALL_USERS } from 'src/users/graphql-queries'

interface Props {
  users: { allUsers: IUser[] }
}

const Users = ({ users }:Props) => {
  const { addUsers, userState } = useStaticUsers()
  const translate = useTranslate()

  useEffect(() => {
    let cleanup = true
    if (cleanup && userState.users.length === 0) {
      users && addUsers(users?.allUsers)
    }
    return () => {
      cleanup = false
    }
  }, [users])

  const sortFunction = (a: IUser | any, b: IUser | any): number =>
    a.verified === b.verified ? 0 : a.verified ? -1 : 1

  return (
    <Fragment>
      <Head>
        <title>Bookend | Best users</title>
      </Head>
      <section>
        <h2 className='text-2xl font-bold px-4 pt-4 sm:py-3 sm:px-0 xl:pl-4'>
          {translate.profile.users} ·{' '}
          {users?.allUsers ? users?.allUsers.length : 'empty'}
        </h2>
        {users?.allUsers &&
          Object.values(users?.allUsers)
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
            ))}
      </section>
    </Fragment>
  )
}

export async function getStaticProps() {
  try {
    const client = GraphqlApolloCLient()
    const { data } = await client.query({ query: ALL_USERS })
    return {
      props: { users: data },
      revalidate: 10,
    }
  } catch (error) {
    return {
      props: { users: null },
      revalidate: 10,
    }
  }
}

export default Users