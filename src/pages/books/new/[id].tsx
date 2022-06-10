import { useRouter } from 'next/router'
import React from 'react'
import NewForm from 'src/components/Post/NewForm'
import { useTranslate } from 'src/hooks/useTranslate'

const BookIdUpdate = () => {
  const router = useRouter()
  const translate = useTranslate()

  return (
    <section className='flex flex-col sm:mx-auto my-4 gap-4 py-4 px-6 sm:min-w-minForm md:mt-0 w-full rounded-xl'>
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

export default BookIdUpdate
