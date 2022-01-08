import { useLazyQuery, useMutation } from '@apollo/client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useProfileId } from 'src/hooks/useProfileId'
import { useToggleUser } from 'src/hooks/useToggleUser'
import { FOLLOW_USER, UNFOLLOW_USER } from 'src/users/graphql-mutations'
import { FIND_PROFILE, FIND_USER } from 'src/users/graphql-queries'
import * as icons from 'src/assets/icons'
import BtnFollow from '../BtnFollow/BtnFollow'

interface Props {
  findUser: Profile;
}

const User = ({ findUser }: Props) => {
  const { data: session, status } = useSession()
  const { handleLoginOpen } = useToggleUser()
  const { profile } = useProfileId()
  const router = useRouter()
  const [getUserByEmail, { data: findUserByEmail }] = useLazyQuery(FIND_USER)

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      session?.user?.email &&
        getUserByEmail({ variables: { email: session?.user?.email } })
    }
    return () => {
      cleanup = false
    }
  }, [])

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

  const isMatch = findUserByEmail?.findUser?.following.some(
    (userId: string) => userId === findUser?.me.user
  )

  return (
    <div className="flex flex-row justify-center rounded-xl items-center relative mb-4">
      <div className="bg-secondary shadow-lg shadow-primary/80 flex items-center rounded-xl px-8 py-3 gap-3">
        <figure className="w-9 h-9 rounded-full overflow-hidden">
          <img
            className="w-full rounded-full"
            src={findUser?.me.photo}
            alt={findUser?.me.name}
          />
        </figure>
        <div className="flex justify-between items-center gap-4">
          <div>
            <p className="flex flex-row items-center">
              {findUser?.me.name}
              {findUser?.me.verified && <span>{icons.checkVeriFied}</span>}
            </p>
            <span className="text-sm text-slate-400/90">
              @{findUser?.me.username}
            </span>
          </div>
          {session?.user?.email !== findUser?.me.email && (
            <BtnFollow user={findUser?.me.user} />
          )}
        </div>
      </div>
    </div>
  )
}

export default User
