import React from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import * as icons from 'src/assets/icons'
import BtnFollow from '../Button/BtnFollow'
import { useRouter } from 'next/router'
import Image from 'next/image'

interface Props {
  findUser: Profile
  toggleOptionsOn?: () => void
}

const User = ({ findUser, toggleOptionsOn }: Props) => {
  const { data: session } = useSession()
  const router = useRouter()

  return (
    <div className='flex flex-row w-full justify-start rounded-xl items-center'>
      <div className='w-full flex items-center rounded-xl'>
        <figure
          onClick={(event) => {
            event.stopPropagation()
            router.push(`/${findUser?.me.username}`)
          }}
          className='cursor-pointer w-12 h-12 rounded-full relative overflow-hidden mr-4'
        >
          <Image
            layout='fill'
            className='w-full h-full rounded-full'
            src={findUser?.me.photo || 'https://i.giphy.com/media/3og0IFrHkIglEOg8Ba/giphy.webp'}
            alt={findUser?.me.name}
          />
        </figure>
        <Link href={`/${findUser?.me.username}`}>
          <a className='flex flex-col relative'>
            <p className='flex flex-row items-center text-lg whitespace-nowrap inset-0'>
              {findUser?.me.name}
              {findUser?.me.verified && (
                <span title='Verified account'>{icons.checkVeriFied}</span>
              )}
            </p>
            <span translate='no' className='dark:text-slate-400 text-slate-700'>
              @{findUser?.me.username}
            </span>
          </a>
        </Link>
      </div>
      {session?.user?.email !== findUser?.me.email && (
        <BtnFollow user={findUser?.me.user} />
      )}
      <button
        onClick={toggleOptionsOn}
        className='flex items-center justify-center w-10 h-10 flex-shrink-0 ml-4 dark:hover:bg-secondaryLigth/50 hover:bg-sky-200/70 rounded-full'
      >
        {icons.dotsHorizontal}
      </button>
    </div>
  )
}

export default User
