import React, { useState } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { FIND_PROFILE, FIND_USER } from 'src/users/graphql-queries'
import { useMutation, useQuery } from '@apollo/client'
import { FOLLOW_USER, UNFOLLOW_USER } from 'src/users/graphql-mutations'
import { useProfileId } from 'src/hooks/useProfileId'
import { checkVeriFied } from 'src/assets/icons'
import { useToggleUser } from 'src/hooks/useToggleUser'

interface Props {
  email: string;
  name: string;
  photo: string;
  user: string;
  username: string;
  verified: boolean;
}

const FollowItem = ({
  email,
  name,
  photo,
  user,
  username,
  verified,
}: Props) => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { profile } = useProfileId()
  const { handleLoginOpen } = useToggleUser()

  const { data: dataUser } = useQuery(FIND_USER, {
    variables: { email: session?.user?.email },
  })

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

  const handleClickLi = (data: string) => {
    router.push(`/${data}`)
  }

  const handleClickButtonFollow = (data: string) => {
    if (status === 'unauthenticated') return handleLoginOpen()
    getFollow({ variables: { user: data, email: session?.user?.email } })
  }

  const handleClickButtonUnFollow = (data: string) => {
    getUnFollow({ variables: { user: data, email: session?.user?.email } })
  }

  const isMatch = dataUser?.findUser?.following.some(
    (userId: string) => userId === user
  )

  return (
    <>
      {session?.user?.email !== email && (
        <li
          className="flex justify-center items-center w-full relative p-2 rounded-xl hover:bg-secondaryLigth transition-colors cursor-pointer"
          onClick={() => handleClickLi(username)}
        >
          <img src={photo} alt={name} className="w-11 h-11 rounded-full mr-3" />
          <div className="flex flex-row w-full justify-between items-center relative">
            <Link href={`/${username}`}>
              <a className="flex flex-col overflow-hidden w-full">
                <h3 className="hover:underline font-semibold text-sm flex items-center">
                  {name}{' '}
                  <span title="Verified account">
                    {verified && checkVeriFied}
                  </span>
                </h3>
                <span className="text-textGray text-sm">@{username}</span>
              </a>
            </Link>
            {!isMatch ? (
              <button
                onClick={(event) => {
                  event.stopPropagation()
                  handleClickButtonFollow(user)
                }}
                className="bg-blue-400 hover:bg-thirdBlue text-textWhite transition-colors font-medium text-xs rounded-2xl px-3 py-1 relative"
              >
                Follow
              </button>
            ) : (
              <button
                onClick={(event) => {
                  event.stopPropagation()
                  handleClickButtonUnFollow(user)
                }}
                className="bg-transparent border border-textGray  hover:bg-red-500 hover:border-red-500 transition-colors font-medium text-xs rounded-2xl px-3 py-1 relative"
              >
                Unfollow
              </button>
            )}
          </div>
        </li>
      )}
    </>
  )
}

export default FollowItem