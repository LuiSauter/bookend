import { useRouter } from 'next/router'
import React from 'react'
import ClientOnly from 'src/components/ClientOnly'
import NewForm from 'src/components/Post/NewForm'


const BookIdUpdate = () => {
  const router = useRouter()
  return (
    <>
      <section className='flex flex-col sm:mx-auto my-4 gap-4 sm:bg-secondary py-4 px-6 sm:min-w-minForm md:mt-0 w-full rounded-xl'>
        <article className='w-full m-auto sm:min-w-minForm'>
          <header className='mb-4'>
            <h2 className='mb-1 text-lg font-semibold'>Update book</h2>
            <hr className='border-secondaryLigth border-b-2 rounded-lg' />
          </header>
          <NewForm id={router.query.id} />
        </article>
      </section>
    </>
  )
}

export default BookIdUpdate
