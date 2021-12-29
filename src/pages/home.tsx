import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { useSession } from 'next-auth/react'
import Head from 'next/head'

import Footer from 'src/components/Footer'
import PostItem from 'src/components/Post/PostItem'
import ProfileForm from 'src/components/ProfileForm/ProfileForm'

import { LOGINQL } from 'src/login/graphql-mutations'
import { ALL_POSTS, POSTS_COUNT } from 'src/post/graphql-queries'
import { ALL_USERS, FIND_USER } from 'src/users/graphql-queries'
import useNearScreen from 'src/hooks/useNearScreen'

const INITIAL_PAGE = 6

const Home = (): JSX.Element => {
  const externalRef = useRef(null)
  const [page, setPage] = useState(INITIAL_PAGE)
  const [allPosts, setAllPosts] = useState<Post[]>([])
  const { data: session, status } = useSession()
  const [getLogin, { data }] = useMutation(LOGINQL, {
    refetchQueries: [
      { query: FIND_USER, variables: { email: session?.user?.email } },
      { query: ALL_USERS },
    ],
  })
  const [getProfile, { data: findData }] = useLazyQuery(FIND_USER)
  const [updateProfile, setUpdateProfile] = useState<boolean>(true)

  const { data: allPostData, loading } = useQuery(ALL_POSTS, {
    variables: { pageSize: page, skipValue: 0 },
  })
  const { data: postsCount } = useQuery(POSTS_COUNT)

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      allPostData?.allPosts?.map((p: Post) => {
        const isMatch = allPosts.some((itemPost) => itemPost.id === p.id)
        if (!isMatch) {
          setAllPosts((prevPost) => [...prevPost, p])
        }
      })
    }
    return () => {
      cleanup = false
    }
  }, [allPostData?.allPosts])

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
      if (page > postsCount?.postCount) return
      console.log(page)
      if (isNearScreen) throttleHandleNextPage()
    }
    return () => {
      cleanup = false
    }
  }, [isNearScreen, throttleHandleNextPage])

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      if (status === 'authenticated') {
        getLogin({
          variables: {
            name: session?.user?.name,
            email: session?.user?.email,
            image: session?.user?.image,
          },
        })
      }
    }
    return () => {
      cleanup = false
    }
  }, [status === 'authenticated'])

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      if (session?.user?.email) {
        getProfile({ variables: { email: session?.user?.email } })
      }
    }
    return () => {
      cleanup = false
    }
  }, [data?.signin])

  const handleClickArrowLeft = () => {
    setUpdateProfile(!updateProfile)
  }

  return (
    <>
      <Head>
        <title>Bookend | home</title>
      </Head>
      {data?.signin && data?.signin?.message === 'signup' ? (
        findData?.findUser &&
        updateProfile && (
          <ProfileForm
            profileData={findData?.findUser}
            onClick={handleClickArrowLeft}
          />
        )
      ) : (
        <>
          <section
            className="w-full min-h-screen  grid place-content-start grid-cols-2 sm:grid-cols-3 gap-4 bg-secondary rounded-xl p-4 transition-all
            2xl:grid-cols-4"
          >
            {
              <>
                {allPosts.map((post: Post) => (
                  <PostItem
                    key={post.id}
                    bookUrl={post.bookUrl}
                    comments={post.comments}
                    description={post.description}
                    id={post.id}
                    image={post.image}
                    tags={post.tags}
                    title={post.title}
                    user={post.user}
                  />
                ))}
              </>
            }
            {loading && <span>LOADING....</span>}
          </section>
          <div id="visor" className="relative" ref={externalRef} />
          <footer className="w-full py-4 flex justify-center lg:hidden">
            <Footer />
          </footer>
        </>
      )}
    </>
  )
}
export default Home