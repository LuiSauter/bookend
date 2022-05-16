import { useLazyQuery, useMutation } from '@apollo/client'
import React, { MouseEvent, useEffect, useState } from 'react'
import { DISLIKE_POST, LIKE_POST } from 'src/post/graphql-mutations'
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
  const [like, setLike] = useState(false)

  const { handleLoginOpen } = useToggleUser()
  const [getLike] = useMutation(LIKE_POST, {
    refetchQueries: [
      { query: FINDONE_POST, variables: { id: [id] } },
      { query: FIND_USER, variables: { email: session?.user?.email } },
      { query: ALL_POST_RANKING, variables: { pageSize: 6, skipValue: 0 } },
    ],
  })
  const [getDisLike] = useMutation(DISLIKE_POST, {
    refetchQueries: [
      { query: FINDONE_POST, variables: { id: [id] } },
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

  const isMatch =
    dataUser?.findUser !== null
      ? dataUser?.findUser.liked.some((postId: string) => postId === id)
      : false

  useEffect(() => {
    let cleanup = true
    if (cleanup && isMatch) {
      isMatch ? setLike(true) : setLike(false)
    }

    return () => {
      cleanup = false
    }
  }, [isMatch])

  const handleLike = (id: string | undefined) => {
    if (status === 'unauthenticated') handleLoginOpen()
    status === 'authenticated' &&
      getLike({ variables: { id: id, email: session?.user?.email } })
  }

  const handleDisLike = (id: string | undefined) => {
    if (status === 'unauthenticated') handleLoginOpen()
    getDisLike({ variables: { id: id, email: session?.user?.email } })
  }

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (status === 'unauthenticated') return handleLoginOpen()
    !like ? handleLike(id) : handleDisLike(id)
    !like ? setLike(true) : setLike(false)
  }

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      title='Likes'
      className='hover:text-red-500 dark:hover:text-red-500 dark:text-slate-400 contrast-125 cursor-default flex items-center gap-1 select-none'
      onMouseEnter={() => {
        setShowHover(true)
      }}
      onMouseLeave={() => setShowHover(false)}
    >
      <button
        onClick={handleClick}
        id='btn-animation'
        className={`
          ${!like ? 'dark:text-inherit text-inherit' : 'text-red-500'}
          ${showHover ? 'bg-red-500/10' : 'bg-transparent'}
          hover:text-red-500 rounded-full h-9 w-9 grid place-content-center place-items-center transition-[0.4s]`}
      >
        {!like ? icons.heart : icons.heartFill}
      </button>
      <span
        className={`transition-all font-semibold ${
          !like ? 'dark:text-inherit text-inherit' : 'text-red-500'
        }`}
      >
        {likes}
      </span>
    </div>
  )
}

export default BtnLike
