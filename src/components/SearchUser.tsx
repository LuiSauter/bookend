import { useLazyQuery } from '@apollo/client'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import * as icons from 'src/assets/icons'
import { SEARCH_USERS } from 'src/users/graphql-queries'
import { LoadingIcon } from 'src/assets/icons/LoadingIcon'
import { useRouter } from 'next/router'
import UsersItem from './SearchResults/UsersItem'
const INITIAL_STATE = ''
const placeholderSearchUser = 'Buscar usuarios'

export interface IUser {
  email: string
  name: string
  photo: string
  user: string
  username: string
  verified: boolean
}

const SearchUser = () => {
  const router = useRouter()
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [searhUser, setSearhUser] = useState<string>(INITIAL_STATE)
  const [getSearchUser, { data, loading }] = useLazyQuery(SEARCH_USERS)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (data?.searchUsers.length !== 0 && searhUser.length !== 0) {
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
          className='dark:bg-secondary bg-slate-200 dark:focus-within:bg-primary focus-within:bg-sky-200 focus-within:text-thirdBlue focus-within:ring-2 ring-thirdBlue flex items-center gap-2 px-4 py-2 rounded-2xl transition-colors z-[80]'
        >
          <span className='opacity-50'>{icons.searchIcon}</span>
          <input
            onChange={handleChange}
            className='bg-transparent outline-none w-full dark:text-white'
            type='text'
            placeholder={placeholderSearchUser}
            value={searhUser}
          />
        </label>
      </form>
      {searhUser.length !== 0 && showSearchResults && (
        <>
          <div className='absolute top-32 -right-2 dark:bg-secondary/80 rounded-xl w-[115%] overflow-y-auto z-[80] shadow-3xl dark:shadow-thirdBlue/30 shadow-thirdBlue/70'>
            <ul className='dark:bg-primary bg-slate-200 rounded-xl overflow-hidden max-h-[65vh] overflow-y-auto z-[80]'>
              {data?.searchUsers.length !== 0 && loading ? (
                <span className='w-full px-1 overflow-y-hidden'>
                  <LoadingIcon />
                </span>
              ) : (
                data?.searchUsers.map((userFind: IUser, index: number) => (
                  <UsersItem
                    key={index}
                    photo={userFind.photo}
                    username={userFind.username}
                    name={userFind.name}
                    verified={userFind.verified}
                    email={userFind.email}
                    user={userFind.user}
                  />
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
