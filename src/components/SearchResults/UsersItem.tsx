import { useRouter } from 'next/router'
import React from 'react'
import BtnFollow from '../Button/BtnFollow'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import * as icons from 'src/assets/icons'

type Props = {
  photo: string | undefined
  username: string | undefined
  name: string | undefined
  verified: boolean
  email: string | undefined
  user: string | undefined
}

const UsersItem = ({
  photo,
  username,
  name,
  verified,
  email,
  user,
}: Props) => {
  const router = useRouter()
  const { data: session } = useSession()

  return (
    <li
      className='p-4 dark:hover:bg-secondary hover:bg-sky-200/70 transition-colors flex z-[1] cursor-pointer'
      onClick={() => {
        router.push(`/${username}`)
      }}
    >
      <img
        src={photo || '/default-user.webp'}
        alt={name}
        className='w-11 h-11 rounded-full mr-3'
      />
      <div className='flex flex-row w-full justify-between items-center relative'>
        <Link href={`/${username}`}>
          <a className='flex flex-col overflow-hidden w-full'>
            <h3 className='hover:underline font-semibold text-sm flex items-center'>
              {name}
              <span title='Verified account'>
                {verified && icons.checkVeriFied}
              </span>
            </h3>
            <span translate='no' className='text-textGray text-sm'>@{username}</span>
          </a>
        </Link>
        {session?.user?.email === email ? (
          <span className='text-sm whitespace-nowrap text-thirdBlue hover:text-thirdBlue/80'>
            see profile
          </span>
        ) : (
          <BtnFollow user={user} />
        )}
      </div>
    </li>
  )
}

export default UsersItem
