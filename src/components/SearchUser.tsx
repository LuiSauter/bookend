import { useLazyQuery, useQuery } from '@apollo/client'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import * as icons from 'src/assets/icons'
import { ALL_USERS, SEARCH_USERS } from 'src/users/graphql-queries'
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
  const [searhUser, setSearhUser] = useState<string>(INITIAL_STATE)
  const [getSearchUser, { data }] = useLazyQuery(SEARCH_USERS)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(searhUser)
    setSearhUser(INITIAL_STATE)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearhUser(e.target?.value)
  }

  console.log(data?.searchUsers)

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
      <form onSubmit={handleSubmit} className='w-full h-full'>
        <label className='bg-secondary focus-within:bg-primary focus-within:text-thirdBlue focus-within:ring-2 ring-thirdBlue flex items-center gap-2 px-4 py-2 rounded-2xl transition-colors'>
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
      {searhUser.length !== 0 && (
        <div className='absolute top-11 right-0 bg-secondary/80 rounded-xl h-max w-[110%] z-[100] shadow-xl'>
          <ul className='bg-secondary rounded-xl overflow-hidden'>
            {data?.searchUsers.length !== 0 &&
              data?.searchUsers.map((userFind: Profile) => (
                <li className='p-4 hover:bg-secondaryLigth' key={userFind.me.user}>
                  {userFind.me.name}
                </li>
              ))}
          </ul>
        </div>
      )}
    </>
  )
}

export default SearchUser


const users = [
  {
    name: 'Luis',
    age: 20,
  },
  {
    name: 'luis gabriel',
    age: 5,
  },
  {
    name: 'Luis Gabriel',
    age: 15,
  },
  {
    name: 'juanito',
    age: 22,
  },
  {
    name: 'Alba',
    age: 30,
  },
  {
    name: 'alva luis',
    age: 19,
  },
]

// for (const {name} of users) {
//   const data = /gabriel/i.test(name)
//   if (data) console.log(name)
// }