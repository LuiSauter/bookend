import React, { Fragment, useEffect, useState } from 'react'
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
import useTimeAgo from 'src/hooks/useTimeAgo'

interface Props {
  id: string | string[];
}

const FindPost = ({ id }: Props) => {
  const [showOptions, setShowOptions] = useState(false)
  const [getPostById, { data, loading }] = useLazyQuery(FINDONE_POST)
  const [getUserById, { data: findUser }] = useLazyQuery(FIND_USER_BY_USER)

  const date = Number(data?.findPost ? data?.findPost.createdAt : 0)
  const { hourAndMinute } = useTimeAgo(date)
  const router = useRouter()

  useEffect(() => {
    const cleanup = true
    if (cleanup) {
      id && getPostById({ variables: { id: id } })
    }
    return () => {
      cleanup
    }
  }, [id])

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      if (data?.findPost.user) getUserById({ variables: { user: data?.findPost?.user } })
    }
    return () => {
      cleanup = false
    }
  }, [data?.findPost])

  const toggleOptions = () => setShowOptions(false)
  const toggleOptionsOn = () => setShowOptions(true)

  return (
    <Fragment>
      <Head>
        <title>Bookend | {loading ? 'Loading' : data?.findPost.title}</title>
      </Head>
      {showOptions && (
        <PostOptions id={data?.findPost.id} toggleOptions={toggleOptions} />
      )}
      {loading ? (
        <div className='flex justify-center items-center h-[90vh]'>
          <LoadingIcon />
        </div>
      ) : (
        <article className='w-full pb-8 rounded-xl relative hover:bg-transparent active:bg-transparent'>
          <div className='flex items-center py-1 pr-2 dark:bg-primary/80 bg-slate-200/80  backdrop-blur-md justify-center w-full gap-4 sticky inset-0 z-[1] md:top-0 md:static'>
            <button
              className='rounded-full ml-2 sm:ml-0 dark:hover:bg-secondaryLigth/50 hover:bg-sky-200/70 flex flex-shrink-0 h-10 w-10 items-center justify-center'
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
          </div>
          <div className='px-4'>
            <h1 className='text-2xl font-semibold text-thirdBlue'>
              {data?.findPost.title}
              <span> | {data?.findPost.author}</span>
            </h1>
            <div className='w-full flex flex-col gap-4 justify-center'>
              <p>
                {data?.findPost.description?.map((d: string, index: number) => (
                  <span className='block mt-3 text-xl' key={index}>
                    {d}
                  </span>
                ))}
              </p>
            </div>
            <figure className='my-3 rounded-lg relative overflow-hidden aspect-[160/230] w-full border border-textGray/50'>
              <img
                className='w-full h-full absolute inset-0 rounded-lg object-cover object-center'
                src={data?.findPost.image}
                alt={data?.findPost.title}
              />
            </figure>
            <span className='dark:text-slate-400 flex border-b pb-2 dark:border-slate-400/30 mb-2'>
              {hourAndMinute}
            </span>
            <MultipleButtons
              comments={data?.findPost?.comments.length}
              id={data?.findPost?.id}
              likes={data?.findPost?.likes.length}
              bookDownload={data?.findPost?.bookUrl}
            />
            <ul className='flex flex-row flex-wrap items-center gap-3 transition-all 2xl relative mt-2'>
              {data?.findPost.tags.map((tag: string, index: number) => (
                <li
                  className='dark:bg-secondary rounded-md px-3 dark:hover:bg-slate-700 hover:bg-sky-200/70 text-slate-400'
                  key={index}
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </article>
      )}
    </Fragment>
  )
}

export default FindPost
