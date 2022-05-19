import React, { useEffect } from 'react'
import Head from 'next/head'

import Footer from 'src/components/Footer'
import Posts from 'src/components/Post'
import ClientOnly from 'src/components/ClientOnly'
import SearchBook from 'src/components/SearchBook'
import { useTranslate } from 'src/hooks/useTranslate'
import { GraphqlApolloCLient } from 'src/data/ApolloClient'
import { ALL_USERS } from 'src/users/graphql-queries'
import { IUser } from 'src/interfaces/Users'
import { useStaticUsers } from 'src/hooks/useStaticUsers'
type Props = {
  users: { allUsers: IUser[] }
}

const Home = ({ users }: Props): JSX.Element => {
  const { addUsers } = useStaticUsers()
  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      users && addUsers(users?.allUsers)
    }
    return () => {
      cleanup = false
    }
  }, [users])

  const translate = useTranslate()
  return (
    <>
      <Head>
        <title>Bookend 📚 | {translate.home.titleSEO}</title>
      </Head>
      <section className='px-4 sm:pb-4 sm:pt-0 sm:px-0 pt-4'>
        <ClientOnly>
          <SearchBook />
        </ClientOnly>
      </section>
      <ClientOnly>
        <Posts />
      </ClientOnly>
      <footer className='w-full py-4 mb-2 sm:mb-0 flex justify-center lg:hidden'>
        <Footer />
      </footer>
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

export default Home
