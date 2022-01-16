import { useLazyQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import * as icons from 'src/assets/icons'
import { LoadingIcon } from 'src/assets/icons/LoadingIcon'
import { SEARCH_POSTS } from 'src/post/graphql-queries'
import Link from 'next/link'

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
    if (data?.searchBooks.length !== 0) {
      router.push(`/books/${data?.searchBooks[0].id}`)
      setWords(INITIAL_STATE)
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className='focus-within:bg-secondary focus-within:text-thirdBlue transition-colors rounded-2xl w-full h-full z-[60] flex'
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
                  <li
                    key={index}
                    onClick={() => {
                      router.push(`/books/${book.id}`)
                      setShowResults(false)
                    }}
                    className='flex flex-row p-4 hover:bg-secondary gap-4'
                  >
                    <img
                      className='aspect-book w-20 h-full my-auto rounded-lg shadow-lg sm:w-32 md:w-24'
                      src={book.image}
                      alt={book.title}
                    />
                    <Link href={`/books/${book.id}`}>
                      <a className='flex flex-col overflow-hidden w-full justify-evenly gap-1'>
                        <div className='hover:underline font-semibold text-sm flex flex-col'>
                          <h2 className='text-xl font-semibold'>
                            {book.title}
                          </h2>
                        </div>
                        <p className='text-thirdBlue text-sm'>
                          <span className='text-slate-300'>Autor: </span>
                          {book.description && book.description[1]}
                        </p>
                        <div className='text-slate-200 text-[15px] overflow-hidden sm:overflow-y-auto'>
                          {book.description &&
                            book.description[0].length > 160 && (
                            <p>
                              {book.description[0].substring(0, 150)}
                              <span className='font-semibold'>
                                  ...Ver más
                              </span>
                            </p>
                          )}
                          {book.description &&
                            book.description[0].length < 160 &&
                            book.description[0]}
                        </div>
                      </a>
                    </Link>
                  </li>
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