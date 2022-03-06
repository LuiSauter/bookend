import React, { ChangeEventHandler, useEffect, useState } from 'react'
import { NextPage } from 'next'
import * as icons from 'src/assets/icons'
import { useRouter } from 'next/router'
import { languageStorage, themeStorage } from 'src/config/constants'
import { useTranslate } from 'src/hooks/useTranslate'
import Head from 'next/head'

const setDark = () => {
  window.localStorage.setItem(themeStorage, 'dark')
  document.documentElement.classList.add('dark')
}

const setLight = () => {
  window.localStorage.setItem(themeStorage, 'light')
  document.documentElement.classList.remove('dark')
}

const currentLanguageStorage =
  typeof window !== 'undefined' && window.localStorage.getItem(languageStorage)

const Display: NextPage = () => {
  const router = useRouter()
  const currentStorage =
    typeof window !== 'undefined' && window.localStorage.getItem(themeStorage)
  const [checked, setChecked] = useState(currentStorage === 'dark')
  const [languages, setLanguages] = useState(
    currentLanguageStorage === null ? 'es' : currentLanguageStorage
  )
  const translate = useTranslate()

  useEffect(() => {
    let cleanup = true
    if (cleanup && typeof window !== 'undefined') {
      const theme = window.localStorage.getItem(themeStorage)
      if (theme === null) {
        setChecked(true)
        setDark()
      }
      theme === 'dark'
        ? (setChecked(true), setDark())
        : (setChecked(false), setLight())
    }
    return () => {
      cleanup = false
    }
  }, [currentStorage])

  const toggleTheme: ChangeEventHandler<HTMLInputElement> = (e) => {
    setChecked(e.target.checked)
    e.target.checked ? setDark() : setLight()
  }

  const onChangeInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    typeof window !== 'undefined' &&
      window.localStorage.setItem(languageStorage, e.target.name)
    setLanguages(e.target.name)
    router.reload()
  }

  return (
    <section>
      <Head>
        <title>Bookend | {translate.display.title}</title>
      </Head>
      <header className='flex items-center py-4 px-2'>
        <button
          onClick={() => router.back()}
          className='rounded-full dark:hover:bg-secondaryLigth/80 hover:bg-sky-200 p-2'
        >
          {icons.arrowLeft}
        </button>
        <h2 className='font-bold text-2xl pl-4'>{translate.display.title}</h2>
      </header>
      <article className='flex justify-between items-center'>
        <div>
          <h2 className='px-4 font-medium text-xl flex items-center'>
            {translate.display.h1}
          </h2>
          <p className='text-base dark:text-textGray pl-4 mt-2'>
            {translate.display.p1}
          </p>
        </div>
        <div className='flex flex-row items-center px-4'>
          <span className='text-2xl'>☀️</span>
          <label className='relative inline-block h-[26px] w-[52px]'>
            <input
              type='checkbox'
              id='checkbox'
              onChange={toggleTheme}
              className='hidden'
              defaultChecked={currentStorage === 'dark'}
            />
            <div
              className={`bg-slate-400 absolute cursor-pointer inset-0 transition-[0.2s] before:bg-white before:bottom-[4px] before:content-[""] before:h-[18px] before:left-[4px] before:absolute before:transition-[0.4s] before:w-[18px] ${
                checked
                  ? 'before:translate-x-[26px] bg-sky-500'
                  : 'bg-slate-400'
              } rounded-[34px] before:rounded-full`}
            ></div>
          </label>
          <span className='text-2xl'>🌒</span>
        </div>
      </article>
      <article className='flex flex-col px-4 mt-4'>
        <h2 className='font-medium text-xl'>{translate.display.h2}</h2>
        <div className='flex flex-row gap-4 justify-center'>
          <label className='flex flex-col justify-center items-center cursor-pointer'>
            <span className='flex flex-row text-lg font-semibold'>
              Español
              <img
                src='https://flagicons.lipis.dev/flags/4x3/es.svg'
                width='20'
                alt='en'
                className='ml-2'
              />
            </span>
            <span
              className={`${
                languages === 'es' &&
                'bg-gradient-to-r from-red-600 via-amber-400 to-red-600'
              } h-2 rounded-t-xl w-full mt-2`}
            />
            <input
              type='radio'
              name='es'
              className='hidden'
              checked={languages === 'es'}
              onChange={onChangeInput}
            />
          </label>
          <label className='flex flex-col justify-center items-center cursor-pointer'>
            <span className='flex flex-row text-lg font-semibold'>
              English
              <img
                src='https://flagicons.lipis.dev/flags/4x3/us.svg'
                width='20'
                alt='en'
                className='ml-2'
              />
            </span>
            <span
              className={`${
                languages === 'en' &&
                'bg-gradient-to-r from-blue-500 via-white to-red-600'
              } h-2 rounded-t-xl w-full mt-2`}
            />
            <input
              type='radio'
              name='en'
              className='hidden'
              checked={languages === 'en'}
              onChange={onChangeInput}
            />
          </label>
        </div>
      </article>
    </section>
  )
}

export default Display
