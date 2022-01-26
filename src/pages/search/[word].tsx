import { useLazyQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import React, { ChangeEvent, useEffect, useState } from 'react'
import SearchBook from 'src/components/SearchBook'
import { SEARCH_POSTS } from 'src/post/graphql-queries'
import { SEARCH_USERS } from 'src/users/graphql-queries'

const SearchWord = () => {
  const router = useRouter()
  const [btnFilter, setBtnFilter] = useState({
    books: true,
    users: false,
    author: false,
  })
  const [getSearchBooks, { data, loading }] = useLazyQuery(SEARCH_POSTS)
  const [getSearchUser, { data: searchUser, loading: userLoading }] =
    useLazyQuery(SEARCH_USERS)

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      btnFilter.books && console.log('books')
      btnFilter.users && console.log('user')
      btnFilter.author && console.log('author')
    }

    return () => {
      cleanup = false
    }
  }, [btnFilter])

  const handleChangeWords = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
  }

  return (
    <section>
      <form className=' h-full z-[60] flex gap-2 sm:mt-4 md:mt-0 m-4 flex-col'>
        <label className='focus-within:bg-secondary focus-within:text-thirdBlue transition-colors rounded-2xl flex items-center gap-2 px-4 py-2 z-[60] w-full'>
          <input
            type='text'
            className='bg-transparent outline-none w-full text-white z-[60]'
            placeholder='Search in Bookend'
            onChange={handleChangeWords}
          />
        </label>
        <div className='flex flex-row gap-4'>
          <button
            type='button'
            onClick={() =>
              setBtnFilter({ books: true, users: false, author: false })
            }
            className={`${
              btnFilter.books
                ? 'border-thirdBlue bg-thirdBlue'
                : 'hover:opacity-80'
            } border rounded-lg px-3`}
          >
            Books
          </button>
          <button
            type='button'
            onClick={() =>
              setBtnFilter({ books: false, users: true, author: false })
            }
            className={`${
              btnFilter.users
                ? 'border-thirdBlue bg-thirdBlue'
                : 'hover:opacity-80'
            } border rounded-lg px-3`}
          >
            Users
          </button>
          <button
            type='button'
            onClick={() =>
              setBtnFilter({ books: false, users: false, author: true })
            }
            className={`${
              btnFilter.author
                ? 'border-thirdBlue bg-thirdBlue'
                : 'hover:opacity-80'
            } border rounded-lg px-3`}
          >
            Author
          </button>
        </div>
      </form>
      <article className='px-4'></article>
    </section>
  )
}

export default SearchWord
