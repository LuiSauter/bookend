import { useLazyQuery } from '@apollo/client'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import * as icons from 'src/assets/icons'
import { LoadingIcon } from 'src/assets/icons/LoadingIcon'
import BooksItem from 'src/components/SearchResults/BooksItem'
import UsersItem from 'src/components/SearchResults/UsersItem'
import { IUser } from 'src/components/SearchUser'
import { useTranslate } from 'src/hooks/useTranslate'
import { SEARCH_POSTS, SEARCH_POSTS_AUTHOR } from 'src/post/graphql-queries'
import { SEARCH_USERS } from 'src/users/graphql-queries'

const SearchWord = (): JSX.Element => {
  const router = useRouter()
  const [showResults, setShowResults] = useState({ books: true, users: false })
  const [words, setWords] = useState<string>('')
  const [currentWord, setCurrentWord] = useState('')
  const translate = useTranslate()
  const [getSearchBooks, { data, loading }] = useLazyQuery(SEARCH_POSTS)
  const [getSearchUser, { data: searchUser, loading: userLoading }] =
    useLazyQuery(SEARCH_USERS)
  const [getSearchBooksByAuthor, { data: dataBooksAuthor }] =
    useLazyQuery(SEARCH_POSTS_AUTHOR)

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      if (words.length !== 0) {
        if (router.query.tag === 'books') {
          getSearchBooks({ variables: { words: words } })
          getSearchBooksByAuthor({ variables: { words: words } })
          setShowResults({ books: true, users: false })
        }
        if (router.query.tag === 'users') {
          getSearchUser({ variables: { name: words } })
          setShowResults({ books: false, users: true })
        }
      }
    }

    return () => {
      cleanup = false
    }
  }, [router.query.tag, words])

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      router.query.word && setWords(router.query.word.toString())
    }

    return () => {
      cleanup = false
    }
  }, [router.query.word])

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      if (typeof document !== 'undefined') {
        const wordStorage = window.localStorage.getItem('lastSearch') || ''
        setCurrentWord(wordStorage)
      }
    }

    return () => {
      cleanup = false
    }
  }, [words.length === 0])

  const handleChangeWords = (e: ChangeEvent<HTMLInputElement>) => {
    setWords(e.target.value)
  }

  const handleSubmitSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (words.length !== 0) {
      typeof window !== 'undefined' &&
        window.localStorage.setItem('lastSearch', words)
      router.push(`/search/${words}/${router.query.tag}`)
    }
  }

  return (
    <>
      <Head>
        <title>
          Bookend | {router.query.word ? router.query.word : 'loading...'}
        </title>
      </Head>
      <section>
        <form
          onSubmit={handleSubmitSearch}
          className='h-full z-[60] flex gap-4 sm:mt-4 md:mt-0 m-3 flex-col'
        >
          <label className='dark:focus-within:bg-secondary focus-within:bg-sky-200 focus-within:text-thirdBlue transition-colors rounded-2xl flex items-center gap-2 px-4 py-2 z-[60] w-full'>
            <span className='opacity-50 z-[60]'>{icons.searchIcon}</span>
            <input
              type='text'
              className='bg-transparent outline-none w-full dark:text-white z-[60]'
              placeholder='Search in Bookend'
              onChange={handleChangeWords}
              value={words}
            />
          </label>
          <div className='flex flex-row flex-wrap gap-4 w-full'>
            <button
              type='button'
              onClick={() => {
                router.push(`/search/${router.query.word}/books`)
                setShowResults({ books: true, users: false })
              }}
              className={`${
                router.query.tag === 'books'
                  ? 'border-thirdBlue bg-thirdBlue'
                  : 'hover:opacity-80 border-slate-400'
              } border rounded-lg px-3`}
            >
              {translate.book.btnBook}
            </button>
            <button
              type='button'
              onClick={() => {
                router.push(`/search/${router.query.word}/users`)
                setShowResults({ books: false, users: true })
              }}
              className={`${
                router.query.tag === 'users'
                  ? 'border-thirdBlue bg-thirdBlue'
                  : 'hover:opacity-80 border-slate-400'
              } border rounded-lg px-3`}
            >
              {translate.book.btnUser}
            </button>
          </div>
        </form>
      </section>
      <section className='w-full h-full relative'>
        {words.length === 0 && (
          <div className='px-3 py-4 inline-block w-full'>
            {translate.book.lastSearch}
            <span
              className='text-thirdBlue cursor-pointer hover:underline'
              onClick={() => {
                setWords(currentWord)
                router.push(`/search/${currentWord}/${router.query.tag}`)
              }}
            >
              {currentWord}
            </span>
          </div>
        )}
        {words.length !== 0 && showResults.books && (
          <ul className='overflow-hidden w-full h-full relative'>
            {data?.searchBooks.length !== 0 && loading ? (
              <span className='w-full px-1 overflow-y-hidden'>
                <LoadingIcon />
              </span>
            ) : (
              <>
                {data?.searchBooks.map((book: Post, index: number) => (
                  <div key={index} className='rounded-xl overflow-hidden'>
                    <BooksItem
                      key={index}
                      id={book.id}
                      description={book.description}
                      title={book.title}
                      image={book.image}
                      author={book.author}
                    />
                  </div>
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
            {data?.searchBooks.length === 0 &&
              dataBooksAuthor?.searchBooksAuthor.length === 0 && (
              <span className='px-3 py-4 inline-block w-full text-center'>
                {translate.book.notFound}
              </span>
            )}
          </ul>
        )}
        {words.length !== 0 && showResults.users && (
          <ul className='dark:bg-primary overflow-hidden'>
            {searchUser?.searchUsers.length !== 0 && userLoading ? (
              <span className='w-full px-1'>
                <LoadingIcon />
              </span>
            ) : (
              searchUser?.searchUsers.map((userFind: IUser, index: number) => (
                <UsersItem
                  key={index}
                  photo={userFind.photo}
                  username={userFind.username}
                  name={userFind.name}
                  verified={userFind.verified}
                  email={userFind.email}
                  user={userFind.user}
                  description={userFind.description}
                />
              ))
            )}
            {searchUser?.searchUsers.length === 0 && (
              <span className='px-3 py-4 inline-block w-full text-center'>
                {translate.book.notFound}
              </span>
            )}
          </ul>
        )}
      </section>
    </>
  )
}

export default SearchWord
