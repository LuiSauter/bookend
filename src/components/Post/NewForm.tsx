import React, { useEffect, useState } from 'react'
import { ALL_POSTS, ALL_POST_BY_USER, ALL_POST_RANKING, FINDONE_POST } from 'src/post/graphql-queries'
import { useForm, useWatch } from 'react-hook-form'
import { useLazyQuery, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'

import { ADD_POST } from 'src/post/graphql-mutations'
import { FIND_USER } from 'src/users/graphql-queries'
import { categorys } from 'src/assets/data/category'
import { useTranslate } from 'src/hooks/useTranslate'
import Textarea from './Textarea'
import Image from 'next/image'

interface Props {
  id?: string | string[] | undefined
}
const NewForm = ({ id = '' }: Props): JSX.Element => {
  const [getPost, { data }] = useLazyQuery(FINDONE_POST)
  const [btnDisabled, setBtnDisabled] = useState(false)
  const translate = useTranslate()
  const { data: session, status } = useSession()
  const router = useRouter()
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    setValue,
  } = useForm({
    defaultValues: {
      postValues: {
        title: '',
        author: '',
        bookUrl: '',
        tags: [''],
        description: '',
        image: '',
      },
    },
  })

  const [getUserByEmail, { data: dataUser }] = useLazyQuery(FIND_USER)
  const [newPostWithBook] = useMutation(ADD_POST, {
    refetchQueries: [
      { query: ALL_POSTS, variables: { pageSize: 3, skipValue: 0 } },
      { query: ALL_POST_RANKING, variables: { pageSize: 6, skipValue: 0 } },
      {
        query: ALL_POST_BY_USER,
        variables: {
          pageSize: 6,
          skipValue: 0,
          username: dataUser?.findUser.me.username,
        },
      },
    ],
  })

  const [description, image] = useWatch({
    control,
    name: ['postValues.description', 'postValues.image'],
  })

  let subscribe = true
  useEffect(() => {
    if (subscribe) {
      session?.user?.email && getUserByEmail({ variables: { email: session?.user?.email } })
    }
    return () => {
      subscribe = false
    }
  }, [session?.user])

  useEffect(() => {
    if (subscribe) {
      if (status === 'unauthenticated') {
        toast.error('login is required', {theme: 'dark'})
        router.push('/')
      }
      if (dataUser?.findUser) {
        const isMatch = dataUser?.findUser.post.some((p: string) => p === id)
        if (!isMatch && !dataUser?.findUser.verified) {
          history.length <= 2 ? router.push('/') : router.back()
        }
        id && getPost({ variables: { id: [id] } })
      }
    }
    return () => {
      subscribe = false
    }
  }, [id, dataUser?.findUser, status])

  useEffect(() => {
    if (subscribe) {
      data?.findPost[0] &&
        setValue('postValues', {
          author: data?.findPost[0].author,
          bookUrl: data?.findPost[0].bookUrl,
          description: data?.findPost[0].description.join('\n'),
          image: data?.findPost[0].image,
          tags: data?.findPost[0].tags,
          title: data?.findPost[0].title,
        })
    }
    return () => {
      subscribe = false
    }
  }, [data?.findPost])

  const onSubmit = (data: FormInputs) => {
    newPostWithBook({
      variables: {
        title: data?.postValues.title,
        description: data?.postValues.description.split('\n'),
        email: session?.user?.email,
        bookUrl: data?.postValues.bookUrl,
        image: data?.postValues.image,
        tags: data?.postValues.tags ? data?.postValues.tags : [''],
        author: data?.postValues.author,
      },
    })
    setBtnDisabled(true)
    return router.push('/')
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-4 w-full px-1 pt-3'
      >
        <div className='w-full flex flex-col gap-3 justify-center'>
          <label className='font-semibold'>
            {translate.post.title} <span className='text-thirdBlue'>* </span>
            {errors.postValues?.title?.type === 'required' && (
              <span className='text-red-500 text-sm font-medium'>
                {errors.postValues?.title.message}
              </span>
            )}
            <input
              className='block w-full rounded-md py-1 px-2 mt-2 dark:text-textWhite dark:bg-secondaryLigth bg-sky-200/80 focus:outline-none focus:ring-4 focus:border-thirdBlue focus:ring-opacity-25 '
              {...register('postValues.title', {
                required: {
                  value: true,
                  message: translate.post.required,
                },
              })}
              // defaultValue={formState.title}
              type='text'
              placeholder={
                translate.post.title === 'Título'
                  ? `Escriba un ${translate.post.title}`
                  : `Write a ${translate.post.title}`
              }
            />
          </label>
          <label className='font-semibold'>
            {translate.post.Description}{' '}
            <span className='text-thirdBlue'>* </span>
            {description.length < 1 && (
              <span className='text-red-500 text-sm font-medium'>
                {translate.post.required}
              </span>
            )}
            <Textarea control={control} />
          </label>
          <label className='font-semibold'>
            {translate.post.Author} <span className='text-thirdBlue'>* </span>
            {errors.postValues?.author?.type === 'required' && (
              <span className='text-red-500 text-sm font-medium'>
                {errors.postValues?.author.message}
              </span>
            )}
            <input
              className='block w-full rounded-md py-1 px-2 mt-2 dark:text-textWhite dark:bg-secondaryLigth bg-sky-200/80 focus:outline-none focus:ring-4 focus:border-thirdBlue focus:ring-opacity-25 '
              {...register('postValues.author', {
                required: {
                  value: true,
                  message: `${translate.post.Author} ${translate.post.required}`,
                },
              })}
              // defaultValue={formState.author}
              type='text'
              placeholder={
                translate.post.Author === 'Autor'
                  ? 'Escriba un autor'
                  : 'Write an author name'
              }
            />
          </label>
        </div>
        <label className='font-semibold'>
          {translate.post.urlBook} <span className='text-thirdBlue'>* </span>
          {errors.postValues?.bookUrl?.type === 'required' && (
            <span className='text-red-500 text-sm font-medium'>
              {errors.postValues?.bookUrl.message}
            </span>
          )}
          <input
            className='block w-full rounded-md py-1 px-2 mt-2 dark:text-textWhite dark:bg-secondaryLigth bg-sky-200/80 focus:outline-none focus:ring-4 focus:border-thirdBlue focus:ring-offset-gray-200'
            {...register('postValues.bookUrl', {
              required: {
                value: true,
                message: `${translate.post.urlBook} ${translate.post.required}`,
              },
            })}
            // defaultValue={formState.bookUrl}
            type='text'
            placeholder='drive.google.com/example'
          />
        </label>
        <label className='font-semibold'>
          {translate.post.urlImage} <span className='text-thirdBlue'>* </span>
          {errors.postValues?.image?.type === 'required' && (
            <span className='text-red-500 text-sm font-medium'>
              {errors.postValues?.image.message}
            </span>
          )}
          <input
            className='block w-full rounded-md py-1 px-2 mt-2 dark:text-textWhite dark:bg-secondaryLigth bg-sky-200/80 focus:outline-none focus:ring-4 focus:border-thirdBlue focus:ring-opacity-25 '
            type='url'
            placeholder={
              translate.post.urlImage === 'Url de la imagen'
                ? 'Escriba la url de la imagen'
                : 'Write url of image'
            }
            required
            {...register('postValues.image', {
              required: {
                value: true,
                message: `${translate.post.urlImage} ${translate.post.required}`,
              },
            })}
          />
        </label>
        {image !== '' && (
          <div className='mx-auto rounded-xl w-2/3 aspect-video h-full relative'>
            <Image
              layout='responsive'
              width={'100%'}
              height={150}
              className='m-auto aspect-video rounded-xl mt-2 w-full h-full shadow-lg object-cover'
              src={image}
            />
          </div>
        )}
        <div className='w-full grid grid-cols-2 sm:grid-cols-3 justify-evenly gap-2'>
          {data?.findPost &&
            categorys.map((category, index: number) => {
              const isMatch = data?.findPost[0].tags.some(
                (checkTag: string) => checkTag === category
              )
              return (
                <label key={index} className='font-medium flex items-center'>
                  <input
                    type='checkbox'
                    value={category}
                    defaultChecked={isMatch ? isMatch : null}
                    className='accent-sky-600 mr-1 h-4 w-4'
                    {...register('postValues.tags')}
                  />
                  {category}
                </label>
              )
            })}
          {!data?.findPost[0].tags &&
            categorys.map((category, index: number) => (
              <label key={index} className='font-medium flex items-center'>
                <input
                  type='checkbox'
                  value={category}
                  className='accent-sky-600 mr-1 h-4 w-4'
                  {...register('postValues.tags')}
                />
                {category}
              </label>
            ))}
        </div>
        <label className='dark:text-slate-400 text-slate-700 text-base'>
          <span className='text-thirdBlue'>* </span>
          {translate.home.fieldRequired}
        </label>
        <button
          disabled={btnDisabled}
          className='bg-blue-500 py-1 rounded-md mb-2 hover:bg-thirdBlue focus:outline-none focus:ring-4 focus:border-thirdBlue focus:ring-offset-gray-200 disabled:opacity-50 text-white'
        >
          {id !== '' ? translate.post.update : translate.post.submit}
        </button>
      </form>
    </>
  )
}

export default NewForm
