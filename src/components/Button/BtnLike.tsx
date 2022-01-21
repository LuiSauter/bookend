import { useLazyQuery, useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { LIKE_POST } from 'src/post/graphql-mutations'
import * as icons from 'src/assets/icons'
import { useSession } from 'next-auth/react'
import { FIND_USER } from 'src/users/graphql-queries'
import { ALL_POST_RANKING, FINDONE_POST } from 'src/post/graphql-queries'
import { useToggleUser } from 'src/hooks/useToggleUser'

interface Props {
  id: string | undefined
  likes: number | undefined
}

const BtnLike = ({ id, likes }: Props) => {
  const { data: session, status } = useSession()
  const [showHover, setShowHover] = useState(false)
  const {handleLoginOpen} = useToggleUser()
  const [getLike] = useMutation(LIKE_POST, {
    refetchQueries: [
      { query: FINDONE_POST, variables: { id } },
      { query: FIND_USER, variables: { email: session?.user?.email } },
      { query: ALL_POST_RANKING, variables: { pageSize: 6, skipValue: 0 } },
    ],
  })
  const [getUserByEmail, { data: dataUser }] = useLazyQuery(FIND_USER)

  useEffect(() => {
    const cleanup = true
    if (cleanup) {
      status === 'authenticated' &&
        getUserByEmail({
          variables: { email: session?.user?.email },
        })
    }
    return () => {
      cleanup
    }
  }, [status === 'authenticated'])

  const handleLike = (id: string | undefined) => {
    if (status === 'unauthenticated') handleLoginOpen()
    status === 'authenticated' &&
      getLike({ variables: { id: id, email: session?.user?.email } })
  }

  const isMatch = dataUser?.findUser.liked.some(
    (postId: string) => postId === id
  )

  return (
    <div
      onClick={(e) => {
        e.stopPropagation()
      }}
      title='Likes'
      className='hover:text-red-500 contrast-125 cursor-default flex items-center gap-1 select-none'
      onMouseEnter={() => setShowHover(true)}
      onMouseLeave={() => setShowHover(false)}
    >
      <button
        onClick={(e) => {
          e.stopPropagation()
          handleLike(id)
        }}
        className={`
          ${!isMatch ? 'text-inherit' : 'text-red-500'}
          ${showHover ? 'bg-red-500/20' : 'bg-transparent'}
          hover:text-red-500 rounded-full h-9 w-9 grid place-content-center place-items-center active:scale-125 active:-rotate-12 transition-all active:ring-0`}
      >
        {!isMatch ? icons.heart : icons.heartFill}
      </button>
      <span
        className={`transition-all ${
          !isMatch ? 'text-inherit' : 'text-red-500'
        }`}
      >
        {likes}
      </span>
    </div>
  )
}

export default BtnLike
