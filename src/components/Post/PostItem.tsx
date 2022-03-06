import React, { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'
import useTimeAgo from 'src/hooks/useTimeAgo'
import { FIND_USER_BY_USER } from 'src/users/graphql-queries'
import { useLazyQuery } from '@apollo/client'
import * as icons from 'src/assets/icons'
import { useRouter } from 'next/router'
import { LoadingIcon } from 'src/assets/icons/LoadingIcon'
import MultipleButtons from 'src/components/Button'
import PostOptions from '../Modal/PostOptions'

type Props = Post

const PostItem = ({
  bookUrl,
  createdAt,
  image,
  title,
  comments,
  description,
  id,
  likes,
  user,
  author,
}: Props) => {
  const [showOptions, setShowOptions] = useState(false)
  const date = Number(createdAt)
  const dateLong = new Date(date)
  const { timeago } = useTimeAgo(date)
  const router = useRouter()
  const [getUserById, { data: findUser }] = useLazyQuery(FIND_USER_BY_USER)

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      if (user) {
        getUserById({ variables: { user: user } })
      }
    }
    return () => {
      cleanup = false
    }
  }, [user])

  const toggleOptions = () => setShowOptions(false)

  return (
    <Fragment>
      {showOptions && <PostOptions id={id} toggleOptions={toggleOptions} />}
      <article
        key={id}
        className='w-full flex flex-row px-4 dark:sm:bg-secondary hover:bg-slate-200 sm:bg-slate-200 sm:hover:bg-sky-200/70 dark:bg-primary dark:sm:hover:bg-secondaryLigth border border-textGray/10 cursor-pointer transition-colors sm:rounded-xl xl:px-6'
        onClick={() => router.push(`/books/${id}`)}
      >
        <figure className='flex items-start my-4 flex-shrink-0 mr-3'>
          <img
            className='h-12 w-12 sm:w-12 sm:h-12 rounded-full'
            src={
              findUser?.findUserById.me.photo
                ? findUser?.findUserById.me.photo
                : '/default-user.webp'
            }
            onClick={(event) => {
              event.stopPropagation()
              router.push(`/${findUser?.findUserById.me.username}`)
            }}
            alt={findUser?.findUserById.me.username}
          />
        </figure>
        <div className='w-full mt-3 xl:mt-4'>
          <div className='w-full flex flex-row justify-between'>
            {findUser?.findUserById ? (
              <Link href={`/${findUser?.findUserById.me.username}`}>
                <a
                  onClick={(event) => {
                    event.stopPropagation()
                  }}
                  className='flex items-center flex-row flex-wrap'
                >
                  <header className='font-semibold text-base flex items-center whitespace-nowrap mr-1'>
                    <h3 className='hover:underline'>
                      {findUser?.findUserById.me.name}
                    </h3>
                    {findUser?.findUserById.me.verified && (
                      <span title='Verified account'>
                        {icons.checkVeriFied}
                      </span>
                    )}
                  </header>
                  <span translate='no' className='dark:text-slate-400 text-slate-500 text-[15px] whitespace-nowrap no-underline'>
                    @{findUser?.findUserById.me.username} ·{' '}
                    <time title={dateLong.toString()}>{timeago}</time>
                  </span>
                </a>
              </Link>
            ) : (
              <span>Loading...</span>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation()
                setShowOptions(true)
              }}
              className='flex items-center text-slate-400 justify-center w-10 h-10 flex-shrink-0 ml-4 dark:hover:bg-textGray/20 hover:bg-slate-300/70 rounded-full'
            >
              {icons.dotsHorizontal}
            </button>
          </div>
          <div>
            <h4 className='text-base text-thirdBlue'>
              {title} - {author}
            </h4>
            <p className='text-[16px] text-black dark:text-textWhite'>
              {description && description.join('\n').length < 350
                ? description
                : `${
                  description &&
                    description.join('\n').toString().substring(0, 350)
                }...`}
            </p>
          </div>
          {image ? (
            <div className='w-full flex mt-4'>
              <figure className='max-h-[440px] rounded-xl overflow-hidden relative border border-textGray/50'>
                <img
                  className='h-full w-full object-cover rounded-xl object-top'
                  src={image}
                  alt={title}
                />
              </figure>
            </div>
          ) : (
            <div className='pt-4'>
              <LoadingIcon />
            </div>
          )}
          <div className='sm:w-[85%] my-2'>
            <MultipleButtons
              comments={comments?.length}
              id={id}
              likes={likes?.length}
              bookDownload={bookUrl}
            />
          </div>
        </div>
      </article>
    </Fragment>
  )
}

export default PostItem
