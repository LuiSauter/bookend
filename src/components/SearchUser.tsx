import { useLazyQuery } from '@apollo/client'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import * as icons from 'src/assets/icons'
import { SEARCH_USERS } from 'src/users/graphql-queries'
import { LoadingIcon } from 'src/assets/icons/LoadingIcon'
import { useRouter } from 'next/router'
import UsersItem from './SearchResults/UsersItem'
import { useTranslate } from 'src/hooks/useTranslate'
const INITIAL_STATE = ''

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
  const translate = useTranslate()
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
    <article className='mx-1 my-4 rounded-2xl h-full relative snap-start shrink-0'>
      <div className='w-full h-10'></div>
      <div className='absolute top-0 -right-0 dark:bg-transparent focus-within:ring-2 focus-within:ring-thirdBlue rounded-2xl w-[100%] overflow-y-auto z-[80] shadow-'>
        <form onSubmit={handleSubmit} className='w-full h-full z-[80]'>
          <label
            onClick={() => setShowSearchResults(true)}
            className='dark:bg-secondary/0 dark:focus-within:bg-primary focus-within:bg-slate-200 focus-within:text-thirdBlue focus-within:rounded-t-xl border-thirdBlue flex items-center gap-2 px-4 py-2 transition-colors z-[80]'
          >
            <span className='opacity-50 z-[80]'>{icons.searchIcon}</span>
            <input
              onChange={handleChange}
              className='bg-transparent outline-none w-full dark:text-white z-[80]'
              type='text'
              placeholder={translate.home.searchBook.userPlaceholder}
              value={searhUser}
              autoFocus={showSearchResults}
            />
          </label>
        </form>
        {searhUser.length !== 0 &&
          showSearchResults && (
          <>
            <ul className='dark:bg-primary bg-slate-200 overflow-hidden max-h-[65vh] overflow-y-auto z-[80]'>
              {data?.searchUsers.length === 0 ? (
                <span className='p-4 dark:hover:bg-secondary hover:bg-sky-200/70 transition-colors flex z-[1] cursor-pointer'>
                  {translate.book.notFound}
                </span>
              ) : loading ? (
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
            <div
              onClick={() => setShowSearchResults(false)}
              className='h-screen w-full fixed top-0 left-0 z-[-1]'
            />
          </>
        )}
      </div>
    </article>
  )
}

export default SearchUser
