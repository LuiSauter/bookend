import React from 'react'
import ClientOnly from 'src/components/ClientOnly'
import AllPosts from 'src/components/Post/AllPosts'
import Head from 'next/head'
import { useTranslate } from 'src/hooks/useTranslate'

const Books = () => {
  const translate = useTranslate()

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

export default Books
