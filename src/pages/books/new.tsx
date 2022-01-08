/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import onExpandableTextareaInput from 'src/config/textarea'
import NewForm from 'src/components/Post/NewForm'
import ClientOnly from 'src/components/ClientOnly'

if (typeof window !== 'undefined') {
  const description = document.getElementById('description') || null
  description?.addEventListener('input', onExpandableTextareaInput)
}

const New = (): JSX.Element => {

  return (
    <>
      <section className='flex flex-col sm:mx-auto my-4 gap-4 bg-secondary py-4 px-6 sm:min-w-minForm sm:mt-0 w-full rounded-xl'>
        <article className='w-full m-auto sm:min-w-minForm'>
          <header className='mb-4'>
            <h2 className='mb-1 text-lg font-semibold'>Create new book</h2>
            <hr className='border-secondaryLigth border-b-2 rounded-lg' />
          </header>
          <ClientOnly>
            <NewForm />
          </ClientOnly>
        </article>
      </section>
    </>
  )
}

export default New