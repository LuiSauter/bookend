import { useLazyQuery } from '@apollo/client'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import * as icons from 'src/assets/icons'
import { SEARCH_USERS } from 'src/users/graphql-queries'
import BtnFollow from './BtnFollow/BtnFollow'
import Link from 'next/link'
import { LoadingIcon } from 'src/assets/icons/LoadingIcon'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
const INITIAL_STATE = ''

interface IUser {
  email: string
  name: string
  photo: string
  user: string
  username: string
  verified: boolean
}

const SearchUser = () => {
  const {data:session} = useSession()
  const router = useRouter()
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [searhUser, setSearhUser] = useState<string>(INITIAL_STATE)
  const [getSearchUser, { data, loading }] = useLazyQuery(SEARCH_USERS)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (data?.searchUsers.length !== 0) {
      router.push(`/${data?.searchUsers[0].username}`)
      setSearhUser(INITIAL_STATE)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearhUser(e.target?.value)
    e.target?.value !== ''
      ? setShowSearchResults(true)
      : setShowSearchResults(false)
  }

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      if (searhUser) {
        searhUser !== '' && getSearchUser({ variables: { name: searhUser } })
      }
    }
    return () => {
      cleanup = false
    }
  }, [searhUser])

  return (
    <>
      <form onSubmit={handleSubmit} className='w-full h-full z-[80]'>
        <label
          onClick={() => setShowSearchResults(true)}
          className='bg-secondary focus-within:bg-primary focus-within:text-thirdBlue focus-within:ring-2 ring-thirdBlue flex items-center gap-2 px-4 py-2 rounded-2xl transition-colors z-[80]'
        >
          <span className='opacity-50'>{icons.searchIcon}</span>
          <input
            onChange={handleChange}
            className='bg-transparent outline-none w-full text-white'
            type='text'
            placeholder='Search users'
            value={searhUser}
          />
        </label>
      </form>
      {searhUser.length !== 0 && showSearchResults && (
        <>
          <div className='absolute top-32 -right-2 bg-secondary/80 rounded-xl w-[115%] overflow-y-auto z-[80] shadow-3xl shadow-thirdBlue/30'>
            <ul className='bg-primary rounded-xl overflow-hidden max-h-[65vh] overflow-y-auto z-[80]'>
              {data?.searchUsers.length !== 0 && loading ? (
                <span className='w-full px-1 overflow-y-hidden'>
                  <LoadingIcon />
                </span>
              ) : (
                data?.searchUsers.map((userFind: IUser, index: number) => (
                  <li
                    className='p-4 hover:bg-secondary transition-colors flex z-[1] cursor-pointer'
                    onClick={() => {
                      router.push(`/${userFind.username}`)
                      setShowSearchResults(false)
                    }}
                    key={index}
                  >
                    <img
                      src={userFind.photo || '/default-user.webp'}
                      alt={userFind.name}
                      className='w-11 h-11 rounded-full mr-3'
                    />
                    <div className='flex flex-row w-full justify-between items-center relative'>
                      <Link href={`/${userFind.username}`}>
                        <a className='flex flex-col overflow-hidden w-full'>
                          <h3 className='hover:underline font-semibold text-sm flex items-center'>
                            {userFind.name}
                            <span title='Verified account'>
                              {userFind.verified && icons.checkVeriFied}
                            </span>
                          </h3>
                          <span className='text-textGray text-sm'>
                            @{userFind.username}
                          </span>
                        </a>
                      </Link>
                      {session?.user?.email === userFind.email ? (
                        <span className='text-sm whitespace-nowrap text-thirdBlue hover:text-thirdBlue/80'>
                          see profile
                        </span>
                      ) : (
                        <BtnFollow user={userFind.user} />
                      )}
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
          <div
            onClick={() => setShowSearchResults(false)}
            className='h-screen w-full fixed top-0 left-0 z-[-1]'
          />
        </>
      )}
    </>
  )
}

export default SearchUser
