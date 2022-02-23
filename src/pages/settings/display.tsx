import React, { ChangeEventHandler, useEffect, useState } from 'react'
import { NextPage } from 'next'
import * as icons from 'src/assets/icons'
import { useRouter } from 'next/router'

const setDark = () => {
  window.localStorage.setItem('theme', 'dark')
  document.documentElement.classList.add('dark')
}

const setLight = () => {
  window.localStorage.setItem('theme', 'light')
  document.documentElement.classList.remove('dark')
}

const Display: NextPage = () => {
  const router = useRouter()
  const currentStorage =
    typeof window !== 'undefined' && window.localStorage.getItem('theme')
  const [checked, setChecked] = useState(currentStorage === 'dark')

  useEffect(() => {
    let cleanup = true
    if (cleanup && typeof window !== 'undefined') {
      const theme = window.localStorage.getItem('theme')
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
  return (
    <section>
      <header className='flex items-center p-4'>
        <button
          onClick={() => router.back()}
          className='rounded-full dark:hover:bg-secondaryLigth/80 hover:bg-sky-200 p-2'
        >
          {icons.arrowLeft}
        </button>
        <h2 className='font-bold text-2xl pl-4'>Pantalla y idiomas</h2>
      </header>
      <article className='flex justify-between items-center'>
        <div>
          <h2 className='px-4 font-medium text-xl flex items-center'>
            Dark theme
          </h2>
          <p className='text-sm dark:text-textGray pl-4'>
            Modo nocturno tu pantalla oscura. Esto hace que sea más fácil mirar
            la pantalla o leer con poca luz y puede ayudarlo a conciliar el
            sueño más fácilmente.
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
    </section>
  )
}

export default Display
