import { useLazyQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import useNearScreen from 'src/hooks/useNearScreen'
import { ALL_POST_BY_USER, ALL_POST_BY_USER_COUNT } from 'src/post/graphql-queries'
import { LoadingIcon } from 'src/assets/icons/LoadingIcon'
import MultipleButtons from 'src/components/Button'
const INITIAL_PAGE = 6

interface Props {
  username: string | string[] | undefined;
}
const MyPosts = ({ username }: Props) => {
  const [page, setPage] = useState(INITIAL_PAGE)
  const [loadingIcon, setLoadingIcon] = useState(true)
  const externalRef = useRef(null)
  const router = useRouter()

  const [getAllPosts, { data: findAllPosts, loading: loadingByPost, refetch }] =
    useLazyQuery(ALL_POST_BY_USER)
  const [getPostsUserCount, { data: allPostUserCount, error:errorCount }] = useLazyQuery(
    ALL_POST_BY_USER_COUNT,
    { ssr: true }
  )

  const { isNearScreen } = useNearScreen({
    externalRef: loadingByPost ? null : externalRef,
    once: false,
  })

  const throttleHandleNextPage = useCallback(() => {
    setPage((prevPage) => prevPage + INITIAL_PAGE)
  }, [setPage])

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      if (username) {
        getAllPosts({
          variables: {
            pageSize: INITIAL_PAGE,
            skipValue: 0,
            username: username,
          },
        })
        setPage(INITIAL_PAGE)
        getPostsUserCount({ variables: { username: username } })
      }
    }
    return () => {
      cleanup = false
    }
  }, [username, setPage])

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      if (allPostUserCount?.allPostUserCount === 0 || page === allPostUserCount?.allPostUserCount) {
        return setLoadingIcon(false)
      }
      if (isNearScreen) {
        if (page <= allPostUserCount?.allPostUserCount) {
          return throttleHandleNextPage()
        }
        return setLoadingIcon(false)
      }
    }

    return () => {
      cleanup = false
    }
  }, [isNearScreen, throttleHandleNextPage, allPostUserCount, page])

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      if (page === INITIAL_PAGE) return
      username &&
        refetch({
          pageSize: page,
          skipValue: 0,
          username: username,
        })
    }

    return () => {
      cleanup = false
    }
  }, [page])

  if (findAllPosts?.allPostsByUsername === null || errorCount) {
    router.replace('/')
  }

  return (
    <>
      <section className='flex flex-col gap-4 w-full min-h-[30vh] mb-4 sm:mb-0'>
        {findAllPosts?.allPostsByUsername !== null &&
          findAllPosts?.allPostsByUsername.map((post: Post) => (
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
              <div className='relative w-full lg:w-[80%] flex flex-col gap-4 justify-between'>
                <h3 className='text-xl font-bold'>{post.title}</h3>
                <span>{post.description ? post.description[0] : ''}</span>
                <p className=''>
                  <span className='text-slate-500 font-medium'>Autor: </span>
                  {post.description ? post.description[1] : ''}
                </p>
                <MultipleButtons
                  comments={post.comments?.length}
                  id={post?.id}
                  likes={post.likes?.length}
                  bookDownload={post.bookUrl}
                />
              </div>
            </article>
          ))}
        {loadingIcon && (
          <div className='col-span-2 sm:col-span-3 py-4'>
            <LoadingIcon />
          </div>
        )}
      </section>
      {/* Unmounted component controlled */}
      {findAllPosts?.allPostsByUsername !== null &&
        findAllPosts?.allPostsByUsername.length <
          allPostUserCount?.allPostUserCount && (
        <div id='visor' className='relative w-full' ref={externalRef} />
      )}
    </>
  )
}

export default MyPosts
