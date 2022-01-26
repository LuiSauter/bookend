import { useLazyQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import * as icons from 'src/assets/icons'
import { LoadingIcon } from 'src/assets/icons/LoadingIcon'
import { SEARCH_POSTS } from 'src/post/graphql-queries'
import BooksItem from './SearchResults/BooksItem'

const INITIAL_STATE = ''

const SearchBook = () => {
  const [showResults, setShowResults] = useState<boolean>(false)
  const [words, setWords] = useState(INITIAL_STATE)
  const [getSearchBooks, { data, loading }] = useLazyQuery(SEARCH_POSTS)
  const router = useRouter()

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      words && getSearchBooks({ variables: { words: words } })
    }
    return () => {
      cleanup = false
    }
  }, [words])

  const handleChangeWords = (e: ChangeEvent<HTMLInputElement>) => {
    setWords(e.target.value)
    e.target.value !== '' ? setShowResults(true) : setShowResults(false)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (words.length !== 0) {
      localStorage.setItem('lastSearch', words)
      router.push(`/search/${words}/books`)
      setWords(INITIAL_STATE)
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className='focus-within:bg-secondary focus-within:text-thirdBlue transition-colors rounded-2xl w-full h-full z-[60] flex sm:mt-4 md:mt-0'
      >
        <label
          onClick={() => setShowResults(true)}
          className='flex items-center gap-2 px-4 py-2 z-[60] w-full'
        >
          <span className='opacity-50 z-[60]'>{icons.searchIcon}</span>
          <input
            className='bg-transparent outline-none w-full text-white z-[60]'
            type='text'
            placeholder='Search in Bookend'
            id='search-books'
            onChange={handleChangeWords}
            value={words}
          />
        </label>
        {words.length !== 0 && (
          <button
            onClick={() => {
              setShowResults(false)
              setWords(INITIAL_STATE)
            }}
            type='button'
            className='hover:text-red-500 z-[60] px-4'
          >
            {icons.exit}
          </button>
        )}
      </form>
      {words.length !== 0 && showResults && (
        <>
          <div className='absolute top-auto w-[90%] left-[5%] sm:w-[90%] sm:left-[5%] z-[60] rounded-bl-xl shadow-xl rounded-br-xl shadow-thirdBlue/30'>
            <ul className='bg-primary rounded-bl-xl rounded-br-xl overflow-hidden max-h-[70vh] overflow-y-auto'>
              {data?.searchBooks.length !== 0 && loading ? (
                <span className='w-full px-1 overflow-y-hidden'>
                  <LoadingIcon />
                </span>
              ) : (
                data?.searchBooks.map((book: Post, index: number) => (
                  <BooksItem
                    key={index}
                    id={book.id}
                    description={book.description}
                    title={book.title}
                    image={book.image}
                  />
                ))
              )}
            </ul>
          </div>
          <div
            onClick={() => setShowResults(false)}
            className='h-screen w-full fixed top-0 left-0 z-50'
          />
        </>
      )}
    </>
  )
}

export default SearchBook