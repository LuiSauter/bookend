import type { NextPage } from 'next'
import React from 'react'
import Link from 'next/link'
import Head from 'next/head'

import * as icons from 'src/assets/icons'

const About: NextPage = () => {
  return (
    <>
      <Head>
        <title>Bookend | About</title>
      </Head>
      <section className='w-full p-4 dark:sm:bg-secondary rounded-xl'>
        <h1 className='text-2xl font-bold'>About Bookend</h1>
        <article className='flex flex-col gap-6 mt-4'>
          <div className='flex flex-col gap-2'>
            <h2 className='text-lg font-bold'>What is bookend?</h2>
            <p className='dark:text-textGray'>
              Bookend is a web application to share books and it was thanks to
              the idea that arose when I was looking to carry out fullstack
              development practices, and I asked myself, can I develop a social
              network? thanks to this I have learned a lot!
            </p>
          </div>
          <div className='flex flex-col gap-2'>
            <h2 className='text-lg font-bold'>Is this an original idea?</h2>
            <p className='dark:text-textGray'>
              a social network service is born in one of the great social
              networks such as facebook, instagram, twitter, etc ...
            </p>
          </div>
          <div className='flex flex-col gap-2'>
            <h2 className='text-lg font-bold'>Technologies used</h2>
            <p className='dark:text-textGray'>
              Typescript, nextJS, graphql with apollo client,
              apollo-server-micro, apollo-server, mongoose, mongodb,
              passport-jwt, postcss, tailwindcss
            </p>
          </div>
          <div className='flex text-textGray flex-row gap-2 relative'>
            <Link href='https://github.com/LuiSauter/bookend'>
              <a
                className='flex flex-row items-center hover:border-b border-b border-transparent border-dashed hover:border-textGray'
                target='_blank'
              >
                {icons.github} GitHub
              </a>
            </Link>
            <Link href='https://sauterdev.vercel.app'>
              <a
                className='flex flex-row gap-1 items-center hover:border-b border-b border-transparent border-dashed hover:border-textGray'
                target='_blank'
              >
                Created by
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