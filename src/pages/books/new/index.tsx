/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react'
import NewForm from 'src/components/Post/NewForm'
import ClientOnly from 'src/components/ClientOnly'
import { useTranslate } from 'src/hooks/useTranslate'
import Head from 'next/head'
import { ALL_USERS } from 'src/users/graphql-queries'
import { GraphqlApolloCLient } from 'src/data/ApolloClient'
import { useStaticUsers } from 'src/hooks/useStaticUsers'
import { IUser } from 'src/interfaces/Users'

type Props = {
  users: { allUsers: IUser[] }
}
const New = ({ users }: Props): JSX.Element => {
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
        <title>Bookend | New Post</title>
      </Head>
      <section className='flex flex-col sm:mx-auto mb-4 gap-4 py-4 px-4 sm:px-0 md:pr-4 xl:pl-4 sm:min-w-minForm md:mt-0 w-full rounded-xl'>
        <article className='w-full m-auto sm:min-w-minForm'>
          <h2 className='text-2xl font-bold mb-2'>{translate.post.add}</h2>
          <hr className='dark:border-secondaryLigth dark:bg-secondaryLigth bg-textGray/20 border-textGray/20 border-b rounded-lg' />
          <ClientOnly>
            <NewForm />
          </ClientOnly>
        </article>
      </section>
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

export default New