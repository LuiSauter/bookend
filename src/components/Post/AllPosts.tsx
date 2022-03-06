import { useQuery } from '@apollo/client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ALL_POST_RANKING, POSTS_COUNT } from 'src/post/graphql-queries'

import useNearScreen from 'src/hooks/useNearScreen'
import CarruselWhoToFollow from '../WhoToFollow/CarruselWhoToFollow'
import { LoadingIcon } from 'src/assets/icons/LoadingIcon'
import { useToggleUser } from 'src/hooks/useToggleUser'
import AllPostItem from './AllPostItem'
import { useRouter } from 'next/router'
const INITIAL_PAGE = 6

const AllPosts = () => {
  const [loadingIcon, setLoadingIcon] = useState(true)
  const { page, handleCountPage } = useToggleUser()
  const externalRef = useRef(null)
  const route = useRouter()

  const {
    data: allPostData,
    loading,
    fetchMore,
  } = useQuery(ALL_POST_RANKING, {
    variables: { pageSize: INITIAL_PAGE, skipValue: 0 },
    ssr: true,
  })

  const { data: postsCount } = useQuery(POSTS_COUNT, { ssr: true })

  const { isNearScreen } = useNearScreen({
    externalRef: loading ? null : externalRef,
    once: false,
  })

  const throttleHandleNextPage = useCallback(() => {
    handleCountPage()
  }, [])

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      if (page === INITIAL_PAGE) return
      if (
        allPostData?.allPostRanking !== undefined &&
        allPostData?.allPostRanking?.length <= postsCount?.postCount
      ) {
        fetchMore({ variables: { pageSize: page, skipValue: 0 } })
      }
    }
    return () => {
      cleanup = false
    }
  }, [page, allPostData?.allPostRanking])

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      if (page >= postsCount?.postCount) {
        return setLoadingIcon(false)
      }
      isNearScreen && throttleHandleNextPage()
    }
    return () => {
      cleanup = false
    }
  }, [isNearScreen, throttleHandleNextPage, allPostData?.allPostRanking])

  return (
    <>
      <section className='w-full min-h-screen p-4 sm:p-0 grid place-content-start grid-cols-2 sm:grid-cols-3 gap-4 rounded-xl transition-all 2xl:grid-cols-4'>
        {allPostData?.allPostRanking.length > Math.random() * (10 - 6) + 6 && (
          <div className='odd:row-start-4 col-span-2 sm:col-span-3 2xl:col-span-4'>
            <CarruselWhoToFollow />
          </div>
        )}
        {allPostData?.allPostRanking.map((post: Post) => (
          <button onClick={(e) => {
            e.stopPropagation()
            route.push(`/books/${post.id}`)
          }} key={post.id}>
            <AllPostItem
              bookUrl={post.bookUrl}
              comments={post.comments}
              description={post.description}
              id={post.id}
              image={post.image}
              tags={post.tags}
              title={post.title}
              user={post.user}
              createdAt={post.createdAt}
              author={post.author}
              likes={post.likes}
            />
          </button>
        ))}
        {loadingIcon && (
          <div className='col-span-2 sm:col-span-3 mt-4'>
            <LoadingIcon />
          </div>
        )}
      </section>
      {allPostData?.allPostRanking?.length < postsCount?.postCount && (
        <div id='visor' className='relative' ref={externalRef} />
      )}
    </>
  )
}

export default AllPosts
