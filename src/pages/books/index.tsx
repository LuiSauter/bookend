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
      <section className='text-red-500 grid place-content-center place-items-center'>
        <h1>Welcome to store books not available</h1>
      </section>
      <ClientOnly>
        <AllPosts />
      </ClientOnly>
    </>
  )
}

export default Books
