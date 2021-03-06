import { useLazyQuery, useMutation } from '@apollo/client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useProfileId } from 'src/hooks/useProfileId'
import { useToggleUser } from 'src/hooks/useToggleUser'
import { useTranslate } from 'src/hooks/useTranslate'
import { FOLLOW_USER, UNFOLLOW_USER } from 'src/users/graphql-mutations'
import { FIND_PROFILE, FIND_USER } from 'src/users/graphql-queries'

interface Props {
  user: string | undefined
}

const BtnFollow = ({ user }: Props) => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { profile } = useProfileId()
  const { handleLoginOpen } = useToggleUser()
  const translate = useTranslate()
  const [getUserByEmail, { data: dataUser }] = useLazyQuery(FIND_USER)

  let subscribe = true
  useEffect(() => {
    if (subscribe) {
      status === 'authenticated' &&
        getUserByEmail({
          variables: { email: session?.user?.email },
        })
    }
    return () => {
      subscribe = false
    }
  }, [status === 'authenticated'])

  const [getFollow] = useMutation(FOLLOW_USER, {
    refetchQueries: [
      { query: FIND_USER, variables: { email: session?.user?.email } },
      {
        query: FIND_PROFILE,
        variables: { username: router.query.username || profile },
      },
    ],
  })

  const [getUnFollow] = useMutation(UNFOLLOW_USER, {
    refetchQueries: [
      { query: FIND_USER, variables: { email: session?.user?.email } },
      {
        query: FIND_PROFILE,
        variables: { username: router.query.username || profile },
      },
    ],
  })

  const handleClickButtonFollow = (data: string | undefined) => {
    if (status === 'unauthenticated') return handleLoginOpen()
    getFollow({ variables: { user: data, email: session?.user?.email } })
  }

  const handleClickButtonUnFollow = (data: string | undefined) => {
    getUnFollow({ variables: { user: data, email: session?.user?.email } })
  }

  const isMatch =
    status === 'authenticated' &&
    dataUser?.findUser?.following.some((userId: string) => userId === user)

  return (
    <>
      {!isMatch ? (
        <button
          onClick={(event) => {
            event.stopPropagation()
            handleClickButtonFollow(user)
          }}
          className='active:bg-thirdBlue/70 bg-thirdBlue hover:bg-thirdBlue/90 text-textWhite transition-colors font-medium text-sm rounded-2xl px-3 py-1 relative'
        >
          {translate.profile.follow}
        </button>
      ) : (
        <button
          onClick={(event) => {
            event.stopPropagation()
            handleClickButtonUnFollow(user)
          }}
          className='bg-transparent dark:text-slate-400 text-slate-700 dark:hover:text-red-500 hover:text-red-500 border px-2 py-1 border-slate-400 hover:border-red-500 transition-colors text-xs rounded-2xl whitespace-nowrap'
        >
          {translate.profile.unfollow}
        </button>
      )}
    </>
  )
}

export default BtnFollow
