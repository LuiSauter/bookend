import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import NewForm from 'src/components/Post/NewForm'
import { GraphqlApolloCLient } from 'src/data/ApolloClient'
import { useStaticUsers } from 'src/hooks/useStaticUsers'
import { useTranslate } from 'src/hooks/useTranslate'
import { IUser } from 'src/interfaces/Users'
import { ALL_USERS } from 'src/users/graphql-queries'

type Props = {
  users: { allUsers: IUser[] }
}

const BookIdUpdate = ({ users }: Props) => {
  const router = useRouter()
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
    <section className='flex flex-col sm:mx-auto my-4 gap-4 dark:sm:bg-secondary py-4 px-6 sm:min-w-minForm md:mt-0 w-full rounded-xl'>
      <article className='w-full m-auto sm:min-w-minForm'>
        <header className='mb-4'>
          <h2 className='mb-1 text-xl font-semibold dark:text-white'>
            {translate.post.update}
          </h2>
          <hr className='dark:border-secondaryLigth border-b-2 rounded-lg' />
        </header>
        <NewForm id={router.query.id} />
      </article>
    </section>
  )
}

export async function getServerSideProps() {
  const client = GraphqlApolloCLient()
  const { data } = await client.query({ query: ALL_USERS })
  return {
    props: {
      users: data,
    },
  }
}

export default BookIdUpdate
