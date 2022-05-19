import React, { useEffect } from 'react'
import ClientOnly from 'src/components/ClientOnly'
import AllPosts from 'src/components/Post/AllPosts'
import Head from 'next/head'
import { useTranslate } from 'src/hooks/useTranslate'
import { ALL_USERS } from 'src/users/graphql-queries'
import { GraphqlApolloCLient } from 'src/data/ApolloClient'
import { useStaticUsers } from 'src/hooks/useStaticUsers'
import { IUser } from 'src/interfaces/Users'

type Props = {
  users: { allUsers: IUser[] }
}
const Books = ({ users }: Props) => {
  const translate = useTranslate()
  const { addUsers, userState } = useStaticUsers()

  useEffect(() => {
    let cleanup = true
    if (cleanup && userState.users.length === 0) {
      users && addUsers(users?.allUsers)
    }
    return () => {
      cleanup = false
    }
  }, [users])

  return (
    <>
      <Head>
        <title>Bookend | Books</title>
      </Head>
      <h1 className='text-2xl font-bold px-4 pt-4 sm:pb-4 sm:pt-3 sm:px-0 xl:pl-4'>
        {translate.book.popular}
      </h1>
      <ClientOnly>
        <AllPosts />
      </ClientOnly>
    </>
  )
}

export async function getStaticProps() {
  const client = GraphqlApolloCLient()
  const { data } = await client.query({ query: ALL_USERS })
  return {
    props: { users: data },
    revalidate: 1,
  }
}

export default Books
