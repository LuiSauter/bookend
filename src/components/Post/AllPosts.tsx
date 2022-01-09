import { useQuery } from '@apollo/client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ALL_POSTS, POSTS_COUNT } from 'src/post/graphql-queries'
import Link from 'next/link'

import useNearScreen from 'src/hooks/useNearScreen'
import PostItem from './PostItem'
import CarruselWhoToFollow from '../WhoToFollow/CarruselWhoToFollow'
const INITIAL_PAGE = 6

const AllPosts = () => {
  const [page, setPage] = useState(INITIAL_PAGE)

  const externalRef = useRef(null)

  const { data: allPostData, loading, fetchMore } = useQuery(ALL_POSTS, {
    variables: { pageSize: 6, skipValue: 0 },
    ssr: true,
  })

  const { data: postsCount } = useQuery(POSTS_COUNT, { ssr: true })

  const { isNearScreen } = useNearScreen({
    externalRef: loading ? null : externalRef,
    once: false,
  })

  const throttleHandleNextPage = useCallback(() => {
    setPage((prevPage) => prevPage + INITIAL_PAGE)
  }, [setPage])

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      console.log(allPostData?.allPosts?.length, postsCount?.postCount)
      if (
        allPostData?.allPosts !== undefined &&
        allPostData?.allPosts?.length >= postsCount?.postCount
      )
        return
      fetchMore({ variables: { pageSize: page, skipValue: 0 } })
    }
    return () => {
      cleanup = false
    }
  }, [page])

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      if (page > postsCount?.postCount) return
      if (isNearScreen) throttleHandleNextPage()
    }
    return () => {
      cleanup = false
    }
  }, [isNearScreen, throttleHandleNextPage])

  return (
    <>
      <section className='w-full min-h-screen p-4 sm:p-0 grid place-content-start grid-cols-2 sm:grid-cols-3 gap-4 rounded-xl transition-all 2xl:grid-cols-4'>
        {allPostData?.allPosts.length > 6 && (
          <div className='odd:row-start-4 col-span-2 sm:col-span-3 2xl:col-span-4'>
            <CarruselWhoToFollow />
          </div>
        )}
        {allPostData?.allPosts.map((post: Post) => (
          <Link href={`/books/${post.id}`} key={post.id}>
            <a>
              <PostItem
                bookUrl={post.bookUrl}
                comments={post.comments}
                description={post.description}
                id={post.id}
                image={post.image}
                tags={post.tags}
                title={post.title}
                user={post.user}
              />
            </a>
          </Link>
        ))}
        {loading && <span>LOADING....</span>}
      </section>
      <div id='visor' className='relative' ref={externalRef} />
    </>
  )
}

export default AllPosts
