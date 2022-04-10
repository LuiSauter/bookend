import React from 'react'
import Link from 'next/link'
import { useTranslate } from 'src/hooks/useTranslate'

const Footer = () => {
  const translate = useTranslate()
  const getYear = new Date().getFullYear()
  return (
    <>
      <div className='flex flex-row flex-wrap text-sm px-4 my-3 gap-4'>
        <Link href='/settings/about'>
          <a className='dark:text-slate-400 text-slate-700 hover:underline'>
            {translate.home.about}
          </a>
        </Link>
        <Link href='https://github.com/LuiSauter/bookend'>
          <a className='dark:text-slate-400 text-slate-700 hover:underline' target='_blank'>
            Github
          </a>
        </Link>
        <span translate='no' className='dark:text-slate-400 text-slate-700'>
          © {getYear} Bookend,{' '}
          <Link href='https://sauterdev.vercel.app/'>
            <a className='hover:underline' target='_blank'>
              Luis G. Janco
            </a>
          </Link>
        </span>
      </div>
    </>
  )
}

export default Footer
