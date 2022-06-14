import React, { useEffect } from 'react'
import Link from 'next/link'
import { useLazyQuery } from '@apollo/client'
import { FIND_PROFILE } from 'src/users/graphql-queries'
import { useTranslate } from 'src/hooks/useTranslate'

type Props = {
  username: string | undefined
  design: string
}

const CountFollows = ({ username, design }: Props) => {
  const [getUser, { data }] = useLazyQuery(FIND_PROFILE)
  const translate = useTranslate()
  let subscribe = true
  useEffect(() => {
    if (subscribe) {
      username && getUser({ variables: { username } })
    }
    return () => {
      subscribe = false
    }
  }, [username])

  return (
    <>
      <div
        className={`flex flex-row ${
          design === 'line'
            ? 'justify-start my-3'
            : 'flex-shrink-0 w-full justify-center border-t border-b border-textGray/10 py-3'
        }`}
      >
        <Link href='#'>
          <a
            className={`flex flex-row items-center justify-center ${
              design === 'line'
                ? 'mr-7 rounded-xl hover:opacity-80'
                : 'flex-col w-full'
            }`}
          >
            <span className={`font-bold ${design === 'line' && 'mr-1'}`}>
              {data?.findProfile ? data?.findProfile.following.length : 0}
            </span>
            <span className='dark:text-slate-400 text-slate-700 text-sm'>
              {translate.profile.following}
            </span>
          </a>
        </Link>
        <Link href='#'>
          <a
            className={`flex flex-row items-center justify-center ${
              design === 'line'
                ? 'mr-7 rounded-xl hover:opacity-80'
                : 'flex-col w-full border-l border-l-textGray/10'
            }`}
          >
            <span className={`font-bold ${design === 'line' && 'mr-1'}`}>
              {data?.findProfile ? data?.findProfile.followers.length : 0}
            </span>
            <span className='dark:text-slate-400 text-slate-700 text-sm'>
              {translate.profile.followers}
            </span>
          </a>
        </Link>
      </div>
    </>
  )
}

export default CountFollows