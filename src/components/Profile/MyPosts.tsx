import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import useNearScreen from 'src/hooks/useNearScreen'
import { ALL_POST_BY_USER, ALL_POST_BY_USER_COUNT, FINDONE_POST } from 'src/post/graphql-queries'
import { LoadingIcon } from 'src/assets/icons/LoadingIcon'
import PostItem from '../Post/PostItem'
import { FIND_PROFILE } from 'src/users/graphql-queries'

const INITIAL_PAGE = 6

interface Props {
  username: string | string[] | undefined;
}
const MyPosts = ({ username }: Props) => {
  const [page, setPage] = useState(INITIAL_PAGE)
  const [loadingIcon, setLoadingIcon] = useState(true)
  const externalRef = useRef(null)
  const router = useRouter()

  const [getUser, { data: userData }] = useLazyQuery(FIND_PROFILE)
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
      if (username) {
        getUser({ variables: { username: username } })
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
  }, [page, allPostUserCount?.allPostUserCount])

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      userData?.findProfile.verified === false &&
        getLikedPost({ variables: { id: userData?.findProfile.liked } })
    }
    return () => {
      cleanup = false
    }
  }, [userData?.findProfile])

  if (findAllPosts?.allPostsByUsername === null || errorCount) {
    router.replace('/')
  }

  return (
    <>
      <section className='flex flex-col gap-4 w-full min-h-[30vh] mb-4 sm:mb-0 pt-4 px-4 sm:px-0 md:px-4'>
        {!userData?.findProfile.verified &&
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
