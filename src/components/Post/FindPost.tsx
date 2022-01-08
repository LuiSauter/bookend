import React, { useEffect } from 'react'
import Link from 'next/link'
import Head from 'next/head'

import { useLazyQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { FIND_USER_BY_USER } from 'src/users/graphql-queries'
import { FINDONE_POST } from 'src/post/graphql-queries'
import * as icons from 'src/assets/icons'
import User from './User'
interface Props {
  id: string | string[];
}

const FindPost = ({ id }: Props) => {
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

  return (
    <>
      <Head>
        <title>
          Bookend | {data?.findPost.title ? data?.findPost.title : 'Loading'}
        </title>
      </Head>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <article className='w-full p-4 rounded-xl relative'>
          <div className='flex items-center gap-4 relative z-[1]'>
            <button
              className='rounded-full hover:bg-secondaryLigth flex h-9 w-9 items-center justify-center'
              onClick={() => router.back()}
            >
              {icons.arrowLeft}
            </button>
            <span className='text-xl font-semibold'>Book</span>
          </div>
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
              <p>
                <span className='text-slate-500 font-medium'>Autor:</span>{' '}
                {data?.findPost.description[1]}
              </p>
              <p className='text-slate-400'>{data?.findPost.description[0]}</p>
            </div>
          </div>
          <div className='flex items-center flex-row flex-wrap gap-3 relative mb-4'>
            <div className='bg-secondary shadow-lg shadow-primary/80 rounded-lg flex items-center gap-2 px-2 py-1 select-none'>
              <button className='hover:text-red-500 active:scale-125 active:-rotate-12 transition-all'>
                {icons.heart}
              </button>
              favoritos
            </div>
            <Link href={data?.findPost?.bookUrl || '/'}>
              <a
                className='flex items-center shadow-lg shadow-primary/80 bg-secondary py-2 px-4 rounded-xl gap-3 hover:bg-secondaryLigth hover:shadow-md hover:shadow-black-600/30'
                target='_blank'
              >
                <span>{icons.googDrive}</span>Google drive PDF
              </a>
            </Link>
          </div>
          {findUser?.findUserById && <User findUser={findUser?.findUserById} />}
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
        </article>
      )}
    </>
  )
}

export default FindPost
