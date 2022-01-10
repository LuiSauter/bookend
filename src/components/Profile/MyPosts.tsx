import { useLazyQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import useNearScreen from 'src/hooks/useNearScreen'
import { ALL_POSTS } from 'src/post/graphql-queries'
import { FIND_PROFILE } from 'src/users/graphql-queries'
import * as icons from 'src/assets/icons'
import BtnLike from '../BtnFollow/BtnLike'
const INITIAL_PAGE = 6
const MyPosts = () => {
  const router = useRouter()
  const { username } = router.query
  const [page, setPage] = useState(INITIAL_PAGE)
  const [getProfile, { data }] = useLazyQuery(FIND_PROFILE, {
    ssr: true,
  })
  const [
    getAllPosts,
    { data: findAllPosts, loading: loadingByPost, fetchMore },
  ] = useLazyQuery(ALL_POSTS)

  const externalRef = useRef(null)
  const { isNearScreen } = useNearScreen({
    externalRef: loadingByPost ? null : externalRef,
    once: false,
  })

  const throttleHandleNextPage = useCallback(() => {
    setPage((prevPage) => prevPage + INITIAL_PAGE)
  }, [setPage])

  useEffect(() => {
    let cleanup = true
    if (data?.findProfile.post.length === 0) return
    if (page === INITIAL_PAGE) {
      cleanup = false
      return
    }
    if (cleanup) {
      if (
        data?.findProfile?.post !== undefined &&
        page <= data?.findProfile?.post.length
      ) {
        data?.findProfile?.me.user &&
          fetchMore({
            variables: {
              pageSize: page,
              skipValue: 0,
              user: data?.findProfile?.me.user,
            },
          })
      }
    }
    return () => {
      cleanup = false
    }
  }, [page, data?.findProfile?.me.user])

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      if (page >= data?.findProfile?.post.length) return
      if (isNearScreen) throttleHandleNextPage()
    }
    return () => {
      cleanup = false
    }
  }, [isNearScreen, throttleHandleNextPage])

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      username && getProfile({ variables: { username } })
    }
    return () => {
      cleanup = false
    }
  }, [username])

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      if (
        data?.findProfile.post.length !== undefined &&
        data?.findProfile.post.length !== 0
      ) {
        data?.findProfile?.me.user &&
          getAllPosts({
            variables: {
              pageSize: INITIAL_PAGE,
              skipValue: 0,
              user: data?.findProfile?.me.user,
            },
          })
      }
    }
    return () => {
      cleanup = false
    }
  }, [data?.findProfile?.me.user])

  return (
    <>
      <section className='flex flex-col gap-4 w-full min-h-[90vh]'>
        {data?.findProfile.post !== undefined &&
          data?.findProfile.post.length !== 0 &&
          findAllPosts?.allPosts.map((post: Post) => (
            <article
              key={post.id}
              className='lg:bg-secondary rounded-xl flex flex-col justify-center p-4 gap-4 lg:flex-row relative lg:hover:bg-secondaryLigth transition-colors hover:brightness-100 cursor-pointer'
              onClick={() => router.push(`/books/${post.id}`)}
            >
              <div className='absolute xl:hidden inset-0 w-full h-[50%] z-0 lg:h-full rounded-xl overflow-hidden'>
                <div className='bg-gradient-to-t from-primary via-primary/70 to-primary absolute inset-0 z-[0]' />
                <img
                  src={post.image}
                  alt={post.description ? post.description[0] : ''}
                  className='absolute inset-0 w-full h-full object-cover object-center z-[-1] rounded-xl'
                />
              </div>
              <figure className='m-0 flex flex-shrink-0 aspect-[160/230] w-40 mx-auto lg:mx-0 rounded-xl overflow-hidden relative shadow-md shadow-black/30 xl:w-44 2xl:w-52'>
                <img
                  src={post.image}
                  alt={post.title}
                  className='w-full h-full absolute inset-0'
                />
              </figure>
              <div className='relative w-full lg:w-[80%] flex flex-col gap-4 justify-evenly'>
                <h3 className='text-xl font-bold'>{post.title}</h3>
                <span>{post.description ? post.description[0] : ''}</span>
                <p className=''>
                  <span className='text-slate-500 font-medium'>Autor: </span>
                  {post.description ? post.description[1] : ''}
                </p>
                <div className='flex items-center flex-row flex-wrap gap-3 relative'>
                  <BtnLike id={post.id} likes={post.likes?.length} />
                  <Link href={post?.bookUrl || '/'}>
                    <a
                      className='flex items-center bg-secondary py-1 px-3 rounded-xl gap-3 hover:bg-thirdBlue hover:shadow-md hover:shadow-black-600/30 transition-colors'
                      target='_blank'
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>{icons.googDrive}</span>Google drive PDF
                    </a>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        {loadingByPost && <span>LOADING....</span>}
      </section>
      {/* Unmounted component controlled */}
      {data?.findProfile.post !== undefined &&
        data?.findProfile.post.length !== 0 &&
        page <= data?.findProfile?.post.length && (
        <div id='visor' className='relative w-full' ref={externalRef} />
      )}
    </>
  )
}

export default MyPosts
