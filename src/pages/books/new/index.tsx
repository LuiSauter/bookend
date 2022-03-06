/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import NewForm from 'src/components/Post/NewForm'
import ClientOnly from 'src/components/ClientOnly'
import { useTranslate } from 'src/hooks/useTranslate'

const New = (): JSX.Element => {
  const translate = useTranslate()
  return (
    <>
      <section className='flex flex-col sm:mx-auto my-4 gap-4 dark:sm:bg-secondary py-4 px-6 sm:min-w-minForm md:mt-0 w-full rounded-xl'>
        <article className='w-full m-auto sm:min-w-minForm'>
          <header className='mb-4'>
            <h2 className='mb-1 text-xl font-semibold'>
              {translate.post.add}
            </h2>
            <hr className='dark:border-secondaryLigth border-slate-400/70 border-b-2 rounded-lg' />
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