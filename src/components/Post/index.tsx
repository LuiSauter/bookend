import { useQuery } from '@apollo/client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ALL_POSTS, POSTS_COUNT } from 'src/post/graphql-queries'

import useNearScreen from 'src/hooks/useNearScreen'
import PostItem from './PostItem'
import { useToggleUser } from 'src/hooks/useToggleUser'
import { PulsePosts } from 'src/assets/icons/esqueleton/PulsePosts'
import { LoadingIcon } from 'src/assets/icons/LoadingIcon'
const INITIAL_PAGE = 3

const index = () => {
  const [loadingIcon, setLoadingIcon] = useState(true)
  const { page, handleCountPage } = useToggleUser()
  const externalRef = useRef(null)

  const {
    data: allPostData,
    loading,
    fetchMore,
  } = useQuery(ALL_POSTS, {
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
        allPostData?.allPosts !== undefined &&
        allPostData?.allPosts?.length <= postsCount?.postCount
      ) {
        fetchMore({ variables: { pageSize: page, skipValue: 0 } })
      }
    }
    return () => {
      cleanup = false
    }
  }, [page, allPostData?.allPosts])

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
  }, [isNearScreen, throttleHandleNextPage, allPostData?.allPosts])

  return (
    <>
      <section className='w-full min-h-screen flex flex-col gap-4 xl:gap-4 md:px-4'>
        {allPostData?.allPosts.map((post: Post) => (
          <PostItem
            key={post.id}
            bookUrl={post.bookUrl}
            createdAt={post.createdAt}
            image={post.image}
            title={post.title}
            comments={post.comments}
            description={post.description}
            id={post.id}
            likes={post.likes}
            tags={post.tags}
            user={post.user}
            author={post.author}
          />
        ))}
        {loadingIcon && (
          <div className='col-span-2 sm:col-span-3 mt-4'>
            <LoadingIcon />
            <PulsePosts n={1} paddingY='py-4' size='h-12 w-12' font='h-2' />
          </div>
        )}
      </section>
      {allPostData?.allPosts?.length < postsCount?.postCount && (
        <div id='visor' className='relative' ref={externalRef} />
      )}
    </>
  )
}

export default index