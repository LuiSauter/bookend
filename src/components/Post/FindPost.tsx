import React, { Fragment, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'

import * as icons from 'src/assets/icons'
import User from './User'
import { LoadingIcon } from 'src/assets/icons/LoadingIcon'
import MultipleButtons from 'src/components/Button'
import PostOptions from '../Modal/PostOptions'
import useTimeAgo from 'src/hooks/useTimeAgo'
import { usePlaceholder } from 'src/hooks/usePlaceholder'
import { IUser } from 'src/interfaces/Users'
import ClientOnly from '../ClientOnly'

interface Props {
  post: Post
  user: IUser | undefined | null
}

const FindPost = ({ post, user = null }: Props) => {
  const [showOptions, setShowOptions] = useState(false)
  const createBlurDataUrl = usePlaceholder()
  const date = Number(post ? post.createdAt : 0)
  const { hourAndMinute } = useTimeAgo(date)
  const router = useRouter()

  const toggleOptions = () => setShowOptions(false)
  const toggleOptionsOn = () => setShowOptions(true)

  const handleBack = () => {
    history.length <= 2 ? router.push('/') : router.back()
  }

  return (
    <Fragment>
      <Head>
        <title>Bookend | {post ? post.title : 'loading'}</title>
      </Head>
      {showOptions && (
        <PostOptions id={post.id} toggleOptions={toggleOptions} />
      )}
      {!post ? (
        <div className='flex justify-center items-center h-[90vh]'>
          <LoadingIcon />
        </div>
      ) : (
        <article className='w-full pb-8 rounded-xl relative hover:bg-transparent active:bg-transparent'>
          <div className='flex items-center py-2 pr-2 dark:bg-primary/80 bg-white/80 backdrop-blur-md justify-center w-full gap-4 sticky inset-0 z-[1] md:top-0 md:pt-0 md:pb-4 md:static xl:px-4'>
            <button
              className='rounded-full ml-2 sm:ml-0 dark:hover:bg-secondaryLigth/50 hover:bg-sky-200/70 flex flex-shrink-0 h-10 w-10 items-center justify-center'
              onClick={handleBack}
            >
              {icons.arrowLeft}
            </button>
            {user && <User user={user} toggleOptionsOn={toggleOptionsOn} />}
          </div>
          <div className='px-4'>
            <h1 className='text-xl font-semibold text-thirdBlue'>
              {post.title}
              <span> | {post.author}</span>
            </h1>
            <div className='w-full flex flex-col gap-4 justify-center'>
              <p>
                {post.description?.map((d: string, index: number) => (
                  <span
                    className='block mt-3 text-[19px] lg:text-[20px] leading-7 font-light dark:text-white'
                    key={index}
                  >
                    {d}
                  </span>
                ))}
              </p>
            </div>
            <figure className='my-3 rounded-2xl relative overflow-hidden aspect-[160/200] w-full border border-textGray/50'>
              <Image
                className='w-full h-full absolute inset-0 rounded-2xl object-cover object-center'
                layout='responsive'
                height={700}
                width={400}
                src={
                  post
                    ? post.image
                    : 'https://i.giphy.com/media/3og0IFrHkIglEOg8Ba/giphy.webp'
                }
                alt={post.title}
                placeholder='blur'
                blurDataURL={createBlurDataUrl({ w: 400, h: 700 })}
              />
            </figure>
            <span className='dark:text-slate-400 text-slate-700 flex border-b pb-2 dark:border-slate-400/30 mb-2'>
              {hourAndMinute}
            </span>
            <ClientOnly>
              <MultipleButtons
                comments={post.comments?.length}
                id={post.id}
                likes={post.likes?.length}
                bookDownload={post.bookUrl}
              />
            </ClientOnly>
            <ul className='flex flex-row flex-wrap items-center gap-3 transition-all 2xl relative mt-2'>
              {post.tags?.map((tag: string, index: number) => (
                <li
                  className='dark:bg-secondary rounded-md px-3 dark:hover:bg-slate-700 hover:bg-sky-200/70 dark:text-slate-400 text-slate-700'
                  key={index}
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </article>
      )}
    </Fragment>
  )
}

export default FindPost
