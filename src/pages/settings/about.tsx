import type { NextPage } from 'next'
import React from 'react'
import Link from 'next/link'
import Head from 'next/head'

import * as icons from 'src/assets/icons'
import { useTranslate } from 'src/hooks/useTranslate'
import { useRouter } from 'next/router'

const About: NextPage = () => {
  const translate = useTranslate()
  const router = useRouter()

  const handleBack = () => {
    history.length <= 2 ? router.push('/') : router.back()
  }

  return (
    <>
      <Head>
        <title>Bookend | {translate.about.name} Bookend</title>
      </Head>
      <section className='w-full rounded-xl'>
        <div className='flex flex-row items-center px-2 py-4 md:pt-0 relative'>
          <button
            className='rounded-full  sm:ml-0 dark:hover:bg-secondaryLigth/50 hover:bg-sky-200/70 flex flex-shrink-0 h-10 w-10 items-center justify-center'
            onClick={handleBack}
          >
            {icons.arrowLeft}
          </button>
          <h1 translate='no' className='text-2xl font-bold ml-2'>
            {translate.about.name} Bookend
          </h1>
        </div>
        <article className='flex flex-col gap-6 mt-4 px-4'>
          <div className='flex flex-col gap-2'>
            <h2 className='text-lg font-bold'>{translate.about.h1}</h2>
            <p className='dark:text-slate-400 text-slate-700textGray'>
              {translate.about.p1}
            </p>
          </div>
          <div className='flex flex-col gap-2'>
            <h2 className='text-lg font-bold'>{translate.about.h2}</h2>
            <p className='dark:text-slate-400 text-slate-700'>
              {translate.about.p2}
            </p>
          </div>
          <div className='flex flex-col gap-2'>
            <h2 className='text-lg font-bold'>{translate.about.h3}</h2>
            <p className='dark:text-slate-400 text-slate-700'>
              {translate.about.p3}
            </p>
          </div>
          <div className='flex text-textGray flex-row gap-2 relative'>
            <Link href='https://github.com/LuiSauter/bookend'>
              <a
                className='flex flex-row items-center hover:border-b border-b border-transparent border-dashed hover:border-textGray dark:text-slate-400 text-slate-700'
                target='_blank'
              >
                {icons.github} GitHub
              </a>
            </Link>
            <Link href='https://sauterdev.vercel.app'>
              <a
                className='flex flex-row gap-1 items-center hover:border-b border-b border-transparent border-dashed hover:border-textGray dark:text-slate-400 text-slate-700'
                target='_blank'
              >
                {translate.about.by}
                <span className='text-thirdBlue'>
                  Luis Gabriel Janco Alvarez
                </span>
              </a>
            </Link>
          </div>
        </article>
      </section>
    </>
  )
}

export default About