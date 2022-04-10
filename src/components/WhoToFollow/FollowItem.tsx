import React from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { checkVeriFied } from 'src/assets/icons'
import BtnFollow from '../Button/BtnFollow'

interface Props {
  email: string
  name: string
  photo: string
  user: string
  username: string
  verified: boolean
}

const FollowItem = ({
  email,
  name,
  photo,
  user,
  username,
  verified,
}: Props) => {
  const { data: session } = useSession()
  const router = useRouter()

  const handleClickLi = (data: string) => {
    router.push(`/${data}`)
  }

  return (
    <>
      {session?.user?.email !== email && (
        <li
          className='flex justify-center items-center w-full relative dark:hover:bg-secondaryLigth hover:bg-sky-200/70 transition-colors cursor-pointer py-2 px-4 overflow-hidden'
          onClick={() => handleClickLi(username)}
        >
          <img
            src={photo || '/default-user.webp'}
            alt={name}
            className='w-11 h-11 rounded-full mr-3'
          />
          <div className='flex flex-row w-full bg-transparent justify-between items-center relative overflow-hidden'>
            <Link href={`/${username}`}>
              <a className='flex flex-col overflow-hidden w-full relative'>
                <h3
                  title={name}
                  className='hover:underline font-semibold text-sm flex items-center whitespace-nowrap'
                >
                  {name}
                  <span title='Verified account'>
                    {verified && checkVeriFied}
                  </span>
                </h3>
                <span translate='no' className='dark:text-slate-400 text-slate-700 text-sm'>
                  @{username}
                </span>
              </a>
            </Link>
            <BtnFollow user={user} />
          </div>
        </li>
      )}
    </>
  )
}

export default FollowItem
