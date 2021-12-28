import React, { useEffect, useState } from 'react'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { useSession } from 'next-auth/react'

import Footer from 'src/components/Footer'
import PostItem from 'src/components/Post/PostItem'
import ProfileForm from 'src/components/ProfileForm/ProfileForm'

import { LOGINQL } from 'src/login/graphql-mutations'
import { ALL_POSTS } from 'src/post/graphql-queries'
import { ALL_USERS, FIND_USER } from 'src/users/graphql-queries'

const datas = [
  {
    title: 'asdasd',
    description: ['asdasd', 'asdasd'],
    image: 'https://i.ibb.co/svPgr92/Las-4-fuerzas-que-rigen-el-universo.jpg',
    bookUrl: 'asdsad',
    comments: ['asdsa'],
    user: 'asdasd12321321',
    tags: ['dsasdsa', 'asdasdsa12312'],
    id: 'asdsad124',
  },
  {
    title: 'asdasd',
    description: ['asdasd', 'asdasd'],
    image: 'https://i.ibb.co/svPgr92/Las-4-fuerzas-que-rigen-el-universo.jpg',
    bookUrl: 'asdsad',
    comments: ['asdsa'],
    user: 'asdasd12321321',
    tags: ['dsasdsa', 'asdasdsa12312'],
    id: 'asdsad124',
  },
  {
    title: 'asdasd',
    description: ['asdasd', 'asdasd'],
    image: 'https://i.ibb.co/svPgr92/Las-4-fuerzas-que-rigen-el-universo.jpg',
    bookUrl: 'asdsad',
    comments: ['asdsa'],
    user: 'asdasd12321321',
    tags: ['dsasdsa', 'asdasdsa12312'],
    id: 'asdsad124',
  },
  {
    title: 'asdasd',
    description: ['asdasd', 'asdasd'],
    image: 'https://i.ibb.co/svPgr92/Las-4-fuerzas-que-rigen-el-universo.jpg',
    bookUrl: 'asdsad',
    comments: ['asdsa'],
    user: 'asdasd12321321',
    tags: ['dsasdsa', 'asdasdsa12312'],
    id: 'asdsad124',
  },
  {
    title: 'asdasd',
    description: ['asdasd', 'asdasd'],
    image: 'https://i.ibb.co/svPgr92/Las-4-fuerzas-que-rigen-el-universo.jpg',
    bookUrl: 'asdsad',
    comments: ['asdsa'],
    user: 'asdasd12321321',
    tags: ['dsasdsa', 'asdasdsa12312'],
    id: 'asdsad124',
  },
  {
    title: 'asdasd',
    description: ['asdasd', 'asdasd'],
    image: 'https://i.ibb.co/svPgr92/Las-4-fuerzas-que-rigen-el-universo.jpg',
    bookUrl: 'asdsad',
    comments: ['asdsa'],
    user: 'asdasd12321321',
    tags: ['dsasdsa', 'asdasdsa12312'],
    id: 'asdsad124',
  },
  {
    title: 'asdasd',
    description: ['asdasd', 'asdasd'],
    image: 'https://i.ibb.co/svPgr92/Las-4-fuerzas-que-rigen-el-universo.jpg',
    bookUrl: 'asdsad',
    comments: ['asdsa'],
    user: 'asdasd12321321',
    tags: ['dsasdsa', 'asdasdsa12312'],
    id: 'asdsad124',
  },
  {
    title: 'asdasd',
    description: ['asdasd', 'asdasd'],
    image: 'https://i.ibb.co/svPgr92/Las-4-fuerzas-que-rigen-el-universo.jpg',
    bookUrl: 'asdsad',
    comments: ['asdsa'],
    user: 'asdasd12321321',
    tags: ['dsasdsa', 'asdasdsa12312'],
    id: 'asdsad124',
  },
  {
    title: 'asdasd',
    description: ['asdasd', 'asdasd'],
    image: 'https://i.ibb.co/svPgr92/Las-4-fuerzas-que-rigen-el-universo.jpg',
    bookUrl: 'asdsad',
    comments: ['asdsa'],
    user: 'asdasd12321321',
    tags: ['dsasdsa', 'asdasdsa12312'],
    id: 'asdsad124',
  },
  {
    title: 'asdasd',
    description: ['asdasd', 'asdasd'],
    image: 'https://i.ibb.co/svPgr92/Las-4-fuerzas-que-rigen-el-universo.jpg',
    bookUrl: 'asdsad',
    comments: ['asdsa'],
    user: 'asdasd12321321',
    tags: ['dsasdsa', 'asdasdsa12312'],
    id: 'asdsad124',
  },
]

const Home = (): JSX.Element => {
  const { data: session, status } = useSession()
  const [getLogin, { data }] = useMutation(LOGINQL, {
    refetchQueries: [
      { query: FIND_USER, variables: { email: session?.user?.email } },
      { query: ALL_USERS },
    ],
  })
  const [getProfile, { data: findData }] = useLazyQuery(FIND_USER)
  const { data: allPostData, loading } = useQuery(ALL_POSTS, {
    variables: { pageSize: 6, skipValue: 0 },
  })
  const [updateProfile, setUpdateProfile] = useState<boolean>(true)

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
          <section className="w-full min-h-screen  grid place-content-start grid-cols-2 sm:grid-cols-3 gap-4 bg-secondary rounded-xl p-4 transition-all">
            {loading ? (
              <span className="w-full text-center">Loading...</span>
            ) : (
              <>
                {allPostData?.allPosts?.map((post: Post) => (
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
            )}
          </section>
          <footer className="w-full py-4 flex justify-center lg:hidden">
            <Footer />
          </footer>
        </>
      )}
    </>
  )
}
export default Home