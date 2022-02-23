import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { ALL_POSTS, ALL_POST_BY_USER, ALL_POST_RANKING, FINDONE_POST } from 'src/post/graphql-queries'
import { useForm } from 'react-hook-form'
import { useLazyQuery, useMutation } from '@apollo/client'
import { ADD_POST } from 'src/post/graphql-mutations'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { FIND_USER } from 'src/users/graphql-queries'
import { toast } from 'react-toastify'
import { categorys } from 'src/assets/data/category'
interface Props {
  id?: string | string[] | undefined
}
const NewForm = ({ id }: Props): JSX.Element => {
  const [getPost, { data }] = useLazyQuery(FINDONE_POST)
  const [fileImage, setFileImage] = useState<string | any>('')
  const [errorMessage, setErrorMessage] = useState(false)
  const [btnDisabled, setBtnDisabled] = useState(false)
  const [textDescription, setTextDescription] = useState('')
  const { data: session, status } = useSession()
  const router = useRouter()
  const descriptionRef: any = useRef(null)
  const [formState, setFormState] = useState({
    title: '',
    author: '',
    bookUrl: '',
    tags: [''],
  })
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()

  const [getUserByEmail, { data: dataUser }] = useLazyQuery(FIND_USER)
  const [newPostWithBook] = useMutation(ADD_POST, {
    refetchQueries: [
      { query: ALL_POSTS, variables: { pageSize: 3, skipValue: 0 } },
      { query: ALL_POST_RANKING, variables: { pageSize: 6, skipValue: 0 } },
      { query: ALL_POST_BY_USER, variables: { pageSize: 6, skipValue: 0, username: dataUser?.findUser.me.username } },
    ],
  })

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      session?.user?.email &&
        getUserByEmail({ variables: { email: session?.user?.email } })
    }
    return () => {
      cleanup = false
    }
  }, [session?.user])

  useEffect(() => {
    if (typeof window !== undefined) {
      if (textDescription.length === 0) {
        setErrorMessage(true)
        setBtnDisabled(true)
      } else {
        setBtnDisabled(false)
        textDescription.length > 0 && setErrorMessage(false)
      }
    }
  }, [data?.findPost, textDescription])

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      if (data?.findPost) {
        setFormState({
          title: data?.findPost.title,
          author: data?.findPost.author,
          bookUrl: data?.findPost.bookUrl,
          tags: data?.findPost.tags,
        })
        if (data?.findPost.image) {
          setFileImage(data?.findPost.image)
        }
        descriptionRef.current.innerHTML = data?.findPost.description
          .map(
            (descrp: string, index: number) =>
              `<div key=${index}>${descrp}</div>`
          )
          .join('\n')
        setTextDescription(data?.findPost.description)
      }
    }
    return () => {
      cleanup = false
    }
  }, [data?.findPost.description])

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      if (status === 'unauthenticated') {
        toast.error('login is required')
        router.push('/')
      }
      if (dataUser?.findUser) {
        const isMatch = dataUser?.findUser.post.some((p: string) => p === id)
        if (!isMatch && !dataUser?.findUser.verified) {
          return router.back()
        }
        id && getPost({ variables: { id: id } })
      }
    }
    return () => {
      cleanup = false
    }
  }, [id, dataUser?.findUser, status])

  const handleChangeFile = (img: string) => {
    return setFileImage(img)
  }

  const onSubmit = (data: FormInputs) => {
    const elDescription = document.getElementById('box-editable')
    const hasDescription = elDescription?.innerText.split('\n')
    newPostWithBook({
      variables: {
        title: data.title,
        description: hasDescription,
        email: session?.user?.email,
        bookUrl: data.bookUrl,
        image: fileImage,
        tags: data.tags ? [...data.tags] : [''],
        author: data.author,
      },
    })
    setBtnDisabled(true)
    return router.back()
  }

  const handleElementEditable = (e: ChangeEvent<HTMLInputElement>) => {
    setTextDescription(e.target.innerText)
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-4 w-full'
      >
        <label className='font-semibold'>
          Add an image url <span className='text-thirdBlue'>* </span>
          <input
            className='block w-full rounded-md py-1 px-2 mt-2 dark:text-textWhite dark:bg-secondaryLigth bg-sky-200/80 focus:outline-none focus:ring-4 focus:border-thirdBlue focus:ring-opacity-25 '
            onChange={(e) => {
              handleChangeFile(e.target.value)
            }}
            value={fileImage}
            type='url'
            placeholder='write url of image'
            required
          />
        </label>
        <div className='w-full flex flex-col sm:flex-row gap-3 justify-center'>
          <div className='w-full flex flex-col gap-2'>
            <label className='font-semibold'>
              Title <span className='text-thirdBlue'>* </span>
              {errors.title?.type === 'required' && (
                <span className='text-red-500 text-sm font-medium'>
                  {errors.title.message}
                </span>
              )}
              <input
                className='block w-full rounded-md py-1 px-2 mt-2 dark:text-textWhite dark:bg-secondaryLigth bg-sky-200/80 focus:outline-none focus:ring-4 focus:border-thirdBlue focus:ring-opacity-25 '
                {...register('title', {
                  required: {
                    value: true,
                    message: 'title is required',
                  },
                })}
                defaultValue={formState.title}
                type='text'
                placeholder='Write a title'
              />
            </label>
            <label className='font-semibold'>
              Description <span className='text-thirdBlue'>* </span>
              {errorMessage && (
                <span className='text-red-500 text-sm font-medium'>
                  Description is required
                </span>
              )}
              <div
                id='box-editable'
                className='dark:bg-secondaryLigth bg-sky-200/80'
                contentEditable='true'
                onInput={handleElementEditable}
                ref={descriptionRef}
              />
            </label>
            <label className='font-semibold'>
              Author <span className='text-thirdBlue'>* </span>
              {errors.author?.type === 'required' && (
                <span className='text-red-500 text-sm font-medium'>
                  {errors.author.message}
                </span>
              )}
              <input
                className='block w-full rounded-md py-1 px-2 mt-2 dark:text-textWhite dark:bg-secondaryLigth bg-sky-200/80 focus:outline-none focus:ring-4 focus:border-thirdBlue focus:ring-opacity-25 '
                {...register('author', {
                  required: {
                    value: true,
                    message: 'Author is required',
                  },
                })}
                defaultValue={formState.author}
                type='text'
                placeholder='Write an author name'
              />
            </label>
          </div>
          {fileImage && (
            <img
              className='m-auto rounded-lg mt-2 w-1/2 shadow-lg'
              src={fileImage || ''}
            />
          )}
        </div>
        <label className='font-semibold'>
          Book in google drive <span className='text-thirdBlue'>* </span>
          {errors.bookUrl?.type === 'required' && (
            <span className='text-red-500 text-sm font-medium'>
              {errors.bookUrl.message}
            </span>
          )}
          <input
            className='block w-full rounded-md py-1 px-2 mt-2 dark:text-textWhite dark:bg-secondaryLigth bg-sky-200/80 focus:outline-none focus:ring-4 focus:border-thirdBlue focus:ring-offset-gray-200'
            {...register('bookUrl', {
              required: {
                value: true,
                message: 'This field is required to google drive',
              },
            })}
            defaultValue={formState.bookUrl}
            type='text'
            placeholder='drive.google.com/example'
          />
        </label>
        <div className='w-full grid grid-cols-2 sm:grid-cols-3 justify-evenly gap-2'>
          {data?.findPost &&
            categorys.map((category, index: number) => {
              const isMatch = data?.findPost.tags.some(
                (checkTag: string) => checkTag === category
              )
              return (
                <label key={index} className='font-medium flex items-center'>
                  <input
                    type='checkbox'
                    value={category}
                    defaultChecked={isMatch ? isMatch : null}
                    className='accent-sky-600 mr-1 h-4 w-4'
                    {...register('tags')}
                  />
                  {category}
                </label>
              )
            })}
          {!data?.findPost.tags &&
            categorys.map((category, index: number) => (
              <label key={index} className='font-medium flex items-center'>
                <input
                  type='checkbox'
                  value={category}
                  className='accent-sky-600 mr-1 h-4 w-4'
                  {...register('tags')}
                />
                {category}
              </label>
            ))}
        </div>
        <label className='text-textGray text-base'>
          <span className='text-thirdBlue'>*</span> fields required
        </label>
        <button
          disabled={btnDisabled}
          className='bg-blue-500 py-1 rounded-md mb-2 hover:bg-thirdBlue focus:outline-none focus:ring-4 focus:border-thirdBlue focus:ring-offset-gray-200 disabled:opacity-50'
        >
          submit
        </button>
      </form>
    </>
  )
}

export default NewForm