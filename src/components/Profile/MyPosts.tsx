import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import useNearScreen from 'src/hooks/useNearScreen'
import { ALL_POST_BY_USER, ALL_POST_BY_USER_COUNT, FINDONE_POST } from 'src/post/graphql-queries'
import { LoadingIcon } from 'src/assets/icons/LoadingIcon'
import PostItem from '../Post/PostItem'

const INITIAL_PAGE = 6

interface Props {
  user: Profile | null;
}
const MyPosts = ({ user = null }: Props) => {
  const [page, setPage] = useState(INITIAL_PAGE)
  const [loadingIcon, setLoadingIcon] = useState(true)
  const externalRef = useRef(null)
  const router = useRouter()

  const [getAllPosts, { data: findAllPosts, loading: loadingByPost, refetch }] = useLazyQuery(ALL_POST_BY_USER)
  const [getPostsUserCount, { data: allPostUserCount, error: errorCount }] =
    useLazyQuery(ALL_POST_BY_USER_COUNT, { ssr: true })
  const [getLikedPost, { data: likedPosts }] = useLazyQuery(FINDONE_POST)

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
      if (user?.me.username) {
        getAllPosts({
          variables: {
            pageSize: INITIAL_PAGE,
            skipValue: 0,
            username: user.me.username,
          },
        })
        setPage(INITIAL_PAGE)
        getPostsUserCount({ variables: { username: user?.me.username } })
      }
    }
    return () => {
      cleanup = false
    }
  }, [user?.me.username, setPage])

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      isNearScreen && throttleHandleNextPage()
    }
    return () => {
      cleanup = false
    }
  }, [isNearScreen, throttleHandleNextPage, allPostUserCount?.allPostUserCount])

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      if (page >= allPostUserCount?.allPostUserCount) {
        setLoadingIcon(false)
      }
      user?.me.username &&
        refetch({
          pageSize: page,
          skipValue: 0,
          username: user?.me.username,
        })
    }

    return () => {
      cleanup = false
    }
  }, [page, allPostUserCount?.allPostUserCount])

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      user?.verified === false &&
        getLikedPost({ variables: { id: user.liked } })
    }
    return () => {
      cleanup = false
    }
  }, [user])

  if (findAllPosts?.allPostsByUsername === null || errorCount) {
    router.replace('/')
  }

  return (
    <>
      <section className='flex flex-col gap-4 w-full min-h-[30vh] mb-4 sm:mb-0 pt-4 sm:px-0 md:pr-4 xl:pl-4'>
        {!user?.verified &&
          likedPosts?.findPost.map((post: Post) => (
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
        {findAllPosts?.allPostsByUsername !== null &&
          findAllPosts?.allPostsByUsername.map((post: Post) => (
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
          <div className='col-span-2 sm:col-span-3 py-4'>
            <LoadingIcon />
          </div>
        )}
      </section>
      {/* Unmounted component controlled */}
      {findAllPosts?.allPostsByUsername.length !==
        allPostUserCount?.allPostUserCount && (
        <div id='visor' className='relative w-full' ref={externalRef} />
      )}
    </>
  )
}

export default MyPosts
