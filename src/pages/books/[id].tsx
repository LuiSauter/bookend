import React, { useEffect, useState } from 'react'
import ClientOnly from 'src/components/ClientOnly'
import FindPost from 'src/components/Post/FindPost'
import { GraphqlApolloCLient } from 'src/data/ApolloClient'
import { useStaticUsers } from 'src/hooks/useStaticUsers'
import { IUser } from 'src/interfaces/Users'
import { ALL_POSTS, FINDONE_POST } from 'src/post/graphql-queries'
import { ALL_USERS } from 'src/users/graphql-queries'

type Props = {
  users: { allUsers: IUser[] }
  post: Post
}
type StaticProps = { params: { id: string } }

const Index = ({ users, post }: Props) => {
  const { addUsers, userState } = useStaticUsers()
  const [user, setUser] = useState<IUser | undefined>({} as IUser)

  let subscribe = true
  useEffect(() => {
    if (subscribe && userState.users.length === 0) {
      users && addUsers(users?.allUsers)
    }
    return () => {
      subscribe = false
    }
  }, [users])

  useEffect(() => {
    if (subscribe) {
      if (post && (userState.users.length !== 0 || users?.allUsers)) {
        const userFind = userState.users.find((user) => user.user === post.user)
        setUser(userFind)
      }
    }
    return () => {
      subscribe = false
    }
  }, [userState?.users, post?.user])

  return (
    <section>
      {post && (
        <ClientOnly>
          <FindPost post={post} user={user} />
        </ClientOnly>
      )}
    </section>
  )
}

export async function getStaticPaths() {
  const client = GraphqlApolloCLient()
  try {
    const { data } = await client.query({
      query: ALL_POSTS,
      variables: { pageSize: 0, skipValue: 0 },
    })
    const paths =
      data?.allPosts &&
      data?.allPosts.map((post: Post) => ({
        params: { id: post.id },
      }))
    return {
      paths: paths,
      fallback: true,
    }
  } catch (error) {
    return {
      paths: [{ id: 0 }],
      fallback: true,
    }
  }
}

export async function getStaticProps({ params }: StaticProps) {
  const client = GraphqlApolloCLient()
  const { data } = await client.query({ query: ALL_USERS })
  try {
    const { data: post } = await client.query({
      query: FINDONE_POST,
      variables: { id: [params.id] },
    })
    if (data.findPost === null) {
      return {
        notFound: true,
      }
    }
    return {
      props: {
        users: data,
        post: post?.findPost[0],
      },
      revalidate: 1,
    }
  } catch (error) {
    return {
      props: {
        users: data,
        post: null,
      },
      revalidate: 1,
    }
  }
}

export default Index
