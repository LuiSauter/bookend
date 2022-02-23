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
      <h1 className='text-2xl font-bold px-4 pt-4 sm:py-4 sm:px-0'>Libros populares</h1>
      <ClientOnly>
        <AllPosts />
      </ClientOnly>
    </>
  )
}

export default Books
