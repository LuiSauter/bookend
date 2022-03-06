import React from 'react'
import Link from 'next/link'
import { useTranslate } from 'src/hooks/useTranslate'

const Footer = () => {
  const translate = useTranslate()
  return (
    <>
      <div className='flex flex-row flex-wrap text-sm px-4 my-3 gap-4'>
        <Link href='/settings/about'>
          <a className='text-textGray hover:underline'>
            {translate.home.about}
          </a>
        </Link>
        <Link href='https://github.com/LuiSauter/bookend'>
          <a className='text-textGray hover:underline' target='_blank'>
            Github
          </a>
        </Link>
        <span translate='no' className='text-textGray'>
          © 2021 Bookend,{' '}
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
