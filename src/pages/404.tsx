import React, { useEffect } from 'react'
import Image from 'next/image'
import { GraphqlApolloCLient } from 'src/data/ApolloClient'
import { ALL_USERS } from 'src/users/graphql-queries'
import { IUser } from 'src/interfaces/Users'
import { useStaticUsers } from 'src/hooks/useStaticUsers'

type Props = {
  users: { allUsers: IUser[] }
}

const Notfound = ({ users }: Props) => {
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
    <div className='h-full w-full p-6 rounded-xl'>
      <h1 className='w-full text-center font-bold text-4xl text-fourth pb-6'>
        Page 404 Not Found
      </h1>
      <figure className='w-full h-96 mx-auto relative px-4'>
        <Image
          src='/images/page-not-found.svg'
          alt='bookend 404 page not found'
          className='w-full object-cover'
          layout='fill'
          priority={true}
        />
      </figure>
    </div>
  )
}
export async function getStaticProps() {
  const client = GraphqlApolloCLient()
  const { data } = await client.query({ query: ALL_USERS })
  return {
    props: {
      users: data,
    },
    revalidate: 60,
  }
}
export default Notfound