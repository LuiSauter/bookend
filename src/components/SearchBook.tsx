import { useLazyQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import * as icons from 'src/assets/icons'
import { LoadingIcon } from 'src/assets/icons/LoadingIcon'
import { useTranslate } from 'src/hooks/useTranslate'
import { SEARCH_POSTS, SEARCH_POSTS_AUTHOR } from 'src/post/graphql-queries'
import BooksItem from './SearchResults/BooksItem'

const INITIAL_STATE = ''

const SearchBook = () => {
  const [showResults, setShowResults] = useState<boolean>(false)
  const [words, setWords] = useState(INITIAL_STATE)
  const translate = useTranslate()
  const [getSearchBooks, { data, loading }] = useLazyQuery(SEARCH_POSTS)
  const [getSearchBooksByAuthor, { data: dataBooksAuthor }] = useLazyQuery(SEARCH_POSTS_AUTHOR)
  const router = useRouter()

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      if (words) {
        getSearchBooks({ variables: { words: words } })
        getSearchBooksByAuthor({ variables: { words: words } })
      }
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
      <div className='h-10' />
      <div
        className={`dark:focus-within:bg-primary focus-within:ring-2 ring-thirdBlue focus-within:bg-slate-200 absolute top-2 md:top-0 left-[3%] z-[60] rounded-2xl w-[94%] overflow-hidden ${
          showResults && 'shadow-3xl shadow-thirdBlue/30'
        }`}
      >
        <form
          onSubmit={handleSubmit}
          className='focus-within:text-thirdBlue transition-colors rounded-t-2xl w-full h-full z-[60] flex md:mt-0'
        >
          <label
            onClick={() => setShowResults(true)}
            className='flex items-center gap-2 px-4 py-2 z-[60] w-full'
          >
            <span className='opacity-50 z-[60]'>{icons.searchIcon}</span>
            <input
              className='bg-transparent outline-none w-full dark:text-white z-[60]'
              type='text'
              placeholder={translate.home.searchBook.placeholder}
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
            <ul className='dark:bg-primary bg-slate-200 rounded-bl-xl rounded-br-xl overflow-hidden max-h-[70vh] overflow-y-auto'>
              {data?.searchBooks.length !== 0 && loading ? (
                <span className='w-full px-1 overflow-y-hidden'>
                  <LoadingIcon height='h-full' />
                </span>
              ) : (
                <>
                  {data?.searchBooks.map((book: Post, index: number) => (
                    <BooksItem
                      key={index}
                      id={book.id}
                      description={book.description}
                      title={book.title}
                      image={book.image}
                      author={book.author}
                    />
                  ))}
                  {dataBooksAuthor?.searchBooksAuthor.map(
                    (book: Post, index: number) => (
                      <BooksItem
                        key={index}
                        id={book.id}
                        description={book.description}
                        title={book.title}
                        image={book.image}
                        author={book.author}
                      />
                    )
                  )}
                </>
              )}
            </ul>
            <div
              onClick={() => setShowResults(false)}
              className='h-screen w-full fixed top-0 left-0 z-[-1]'
            />
          </>
        )}
      </div>
    </>
  )
}

export default SearchBook