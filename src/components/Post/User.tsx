import React from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import * as icons from 'src/assets/icons'
import BtnFollow from '../BtnFollow/BtnFollow'
import { useRouter } from 'next/router'

interface Props {
  findUser: Profile
}

const User = ({ findUser }: Props) => {
  const { data: session } = useSession()
  const router = useRouter()

  return (
    <div className='flex flex-row w-full justify-start rounded-xl items-center relative'>
      <div className='w-full flex items-center rounded-xl'>
        <figure
          onClick={(event) => {
            event.stopPropagation()
            router.push(`/${findUser?.me.username}`)
          }}
          className='cursor-pointer w-10 h-10 rounded-full overflow-hidden mr-4'
        >
          <img
            className='w-full h-full rounded-full'
            src={findUser?.me.photo || '/default-user.webp'}
            alt={findUser?.me.name}
          />
        </figure>
        <Link href={`/${findUser?.me.username}`}>
          <a className='flex flex-col relative'>
            <p className='flex flex-row items-center text-lg whitespace-nowrap inset-0'>
              {findUser?.me.name}
              {findUser?.me.verified && <span>{icons.checkVeriFied}</span>}
            </p>
            <span className='text-slate-400/90'>@{findUser?.me.username}</span>
          </a>
        </Link>
      </div>
      {session?.user?.email !== findUser?.me.email && (
        <BtnFollow user={findUser?.me.user} />
      )}
    </div>
  )
}

export default User
