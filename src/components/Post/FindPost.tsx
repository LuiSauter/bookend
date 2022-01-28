import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'

import { useLazyQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { FIND_USER_BY_USER } from 'src/users/graphql-queries'
import { FINDONE_POST } from 'src/post/graphql-queries'
import * as icons from 'src/assets/icons'
import User from './User'
import { LoadingIcon } from 'src/assets/icons/LoadingIcon'
import MultipleButtons from 'src/components/Button'
import PostOptions from '../Modal/PostOptions'

interface Props {
  id: string | string[];
}

const FindPost = ({ id }: Props) => {
  const [showOptions, setShowOptions] = useState(false)
  const [getPostById, { data, loading }] = useLazyQuery(FINDONE_POST)
  const [getUserById, { data: findUser }] = useLazyQuery(FIND_USER_BY_USER)
  const router = useRouter()

  useEffect(() => {
    const cleanup = true
    if (cleanup) {
      id &&
        getPostById({
          variables: { id: id },
        })
    }
    return () => {
      cleanup
    }
  }, [id])

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      if (data?.findPost.user) {
        getUserById({ variables: { user: data?.findPost?.user } })
      }
    }
    return () => {
      cleanup = false
    }
  }, [data?.findPost])

  const toggleOptions = () => setShowOptions(false)
  const toggleOptionsOn = () => setShowOptions(true)

  return (
    <>
      <Head>
        <title>
          Bookend | {data?.findPost.title ? data?.findPost.title : 'Loading'}
        </title>
      </Head>
      {showOptions && (
        <PostOptions
          id={data?.findPost.id}
          toggleOptions={toggleOptions}
        />
      )}
      <article className='w-full pb-8 rounded-xl relative hover:bg-transparent active:bg-transparent'>
        <div className='flex items-center py-2 pr-2 bg-primary/50 backdrop-blur-sm justify-center w-full gap-4 sticky inset-0 z-[1] md:top-12'>
          {loading ? (
            <LoadingIcon />
          ) : (
            <>
              <button
                className='rounded-full ml-2 sm:ml-0 hover:bg-secondaryLigth/50 flex flex-shrink-0 h-10 w-10 items-center justify-center'
                onClick={() => router.back()}
              >
                {icons.arrowLeft}
              </button>
              {findUser?.findUserById && (
                <User
                  findUser={findUser?.findUserById}
                  toggleOptionsOn={toggleOptionsOn}
                />
              )}
            </>
          )}
        </div>
        {loading ? (
          <LoadingIcon />
        ) : (
          <div className='px-4'>
            <figure className='absolute inset-0 z-[0] h-[70vh]'>
              <div className='bg-gradient-to-t from-primary via-primary/60 to-primary h-full w-full absolute inset-0' />
              <img
                className='w-full h-full object-cover object-center z-[0]'
                src={data?.findPost.image}
                alt={data?.findPost.title}
              />
            </figure>
            <div className='flex flex-col my-4 gap-4 justify-start relative lg:flex-row'>
              <header className='flex flex-col items-center gap-4'>
                <figure className='m-0 rounded-lg relative overflow-hidden aspect-[160/230] w-44'>
                  <img
                    className='w-full h-full absolute inset-0 rounded-lg object-cover object-center'
                    src={data?.findPost.image}
                    alt={data?.findPost.title}
                  />
                </figure>
              </header>
              <div className='w-full flex flex-col gap-4 justify-center'>
                <h1 className='text-2xl font-bold'>{data?.findPost.title}</h1>
                <p className='text-thirdBlue font-medium'>
                  <span className='text-slate-50 font-medium'>Autor:</span>{' '}
                  {data?.findPost.author}
                </p>
                <p>{data?.findPost.description}</p>
              </div>
            </div>
            <MultipleButtons
              comments={data?.findPost?.comments.length}
              id={data?.findPost?.id}
              likes={data?.findPost?.likes.length}
              bookDownload={data?.findPost?.bookUrl}
            />
            <div className='flex mt-3 flex-row flex-wrap gap-3 relative mb-4'>
              <Link href={data?.findPost?.bookUrl || '/'}>
                <a
                  className='flex items-center shadow-lg shadow-primary/80 bg-secondary py-2 px-4 rounded-xl gap-3 hover:bg-secondaryLigth hover:shadow-md hover:shadow-black-600/30'
                  target='_blank'
                >
                  <span>{icons.googDrive}</span>Google drive PDF
                </a>
              </Link>
            </div>
            <ul className='flex flex-row flex-wrap items-center gap-3 transition-all 2xl relative'>
              {data?.findPost.tags.map((tag: string, index: number) => (
                <li
                  className='bg-secondary rounded-md px-3 hover:bg-slate-700 text-slate-400'
                  key={index}
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        )}
      </article>
    </>
  )
}

export default FindPost
