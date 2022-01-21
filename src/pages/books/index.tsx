import React from 'react'
import ClientOnly from 'src/components/ClientOnly'
import AllPosts from 'src/components/Post/AllPosts'
import Head from 'next/head'

const Books = () => {
  return (
    <>
      <Head>
        <title>Bookend | Books</title>
      </Head>
      <h1 className='text-xl font-bold py-4'>Books Ranking</h1>
      <ClientOnly>
        <AllPosts />
      </ClientOnly>
    </>
  )
}

export default Books
