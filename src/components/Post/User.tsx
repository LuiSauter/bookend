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
    <div
      onClick={(event) => {
        event.stopPropagation()
        router.push(`/${findUser?.me.username}`)
      }}
      className='flex flex-row justify-center rounded-xl items-center relative mb-4'
    >
      <div className='bg-secondary hover:bg-secondaryLigth cursor-pointer shadow-lg shadow-primary/80 flex items-center rounded-xl px-8 py-3 gap-3'>
        <figure className='w-9 h-9 rounded-full overflow-hidden'>
          <img
            className='w-full rounded-full'
            src={findUser?.me.photo}
            alt={findUser?.me.name}
          />
        </figure>
        <div className='flex justify-between items-center gap-4'>
          <Link href={`/${findUser?.me.username}`}>
            <a>
              <p className='flex flex-row items-center'>
                {findUser?.me.name}
                {findUser?.me.verified && <span>{icons.checkVeriFied}</span>}
              </p>
              <span className='text-sm text-slate-400/90'>
                @{findUser?.me.username}
              </span>
            </a>
          </Link>
          {session?.user?.email !== findUser?.me.email && (
            <BtnFollow user={findUser?.me.user} />
          )}
        </div>
      </div>
    </div>
  )
}

export default User
