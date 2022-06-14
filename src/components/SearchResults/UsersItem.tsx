import { useRouter } from 'next/router'
import React from 'react'
import BtnFollow from '../Button/BtnFollow'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import * as icons from 'src/assets/icons'
import PhotoUser from '../User/PhotoUser'

type Props = {
  photo: string | undefined
  username: string | undefined
  name: string | undefined
  verified: boolean
  email: string | undefined
  user: string | undefined
  description: string | undefined
}

const UsersItem = ({
  photo,
  username,
  name,
  verified,
  email,
  user,
  description
}: Props) => {
  const router = useRouter()
  const { data: session } = useSession()

  return (
    <li
      className='p-4 dark:hover:bg-secondary hover:bg-sky-200/70 transition-colors flex z-[1] cursor-pointer items-center'
      onClick={() => {
        router.push(`/${username}`)
      }}
    >
      <figure className='w-14 h-14 mr-3 relative overflow-hidden rounded-full flex flex-shrink-0'>
        <PhotoUser
          nameAlt={name}
          photoURL={photo}
          styles='rounded-full'
          placeholder={true}
        />
      </figure>
      <div className='flex flex-row w-full justify-between items-center relative'>
        <Link href={`/${username}`}>
          <a className='flex flex-col overflow-hidden w-full'>
            <h3 className='hover:underline font-semibold text-base flex items-center'>
              {name}
              <span title='Verified account'>
                {verified && icons.checkVeriFied}
              </span>
            </h3>
            <span translate='no' className='text-textGray text-base'>
              @{username}
            </span>
            {description && (
              <p className='text-sm sm:text-base'>
                {description.length < 50
                  ? description
                  : `${description.toString().substring(0, 55)}...`}
              </p>
            )}
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
