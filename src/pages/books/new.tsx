/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import onExpandableTextareaInput from 'src/config/textarea'
import { categorys } from 'src/assets/data/category'
import { useMutation } from '@apollo/client'
import { ADD_POST } from 'src/post/graphql-mutations'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ALL_POSTS } from 'src/post/graphql-queries'
import NewForm from 'src/components/Post/NewForm'
import ClientOnly from 'src/components/ClientOnly'

if (typeof window !== 'undefined') {
  const description = document.getElementById('description') || null
  description?.addEventListener('input', onExpandableTextareaInput)
}

const New = (): JSX.Element => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<FormInputs>()
  const [fileImage, setFileImage] = useState<string | any>('')
  const { data: session } = useSession()
  const router = useRouter()
  const [newPostWithBook] = useMutation(ADD_POST, {
    refetchQueries: [
      { query: ALL_POSTS, variables: { pageSize: 3, skipValue: 0 } },
    ],
  })

  const handleChangeFile = (data: string) => {
    return setFileImage(data)
  }
  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    const hasLength = data.description.split('\n')
    newPostWithBook({
      variables: {
        title: data.title,
        description: hasLength,
        email: session?.user?.email,
        bookUrl: data.book,
        image: data.img,
        tags: [...data.tags],
      },
    })
    return router.push('/')
  }

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