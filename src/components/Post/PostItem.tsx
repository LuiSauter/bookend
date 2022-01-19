import React, { useEffect } from 'react'
import Link from 'next/link'
import useTimeAgo from 'src/hooks/useTimeAgo'
import { FIND_USER_BY_USER } from 'src/users/graphql-queries'
import { useLazyQuery } from '@apollo/client'
import * as icons from 'src/assets/icons'
import { useRouter } from 'next/router'

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
  tags,
  user,
  author
}: Props) => {
  const date = Number(createdAt)
  const dateLong = new Date(date)
  const timeago = useTimeAgo(date)
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

  return (
    <article
      key={id}
      className='w-full flex flex-row px-4 sm:bg-secondary sm:hover:bg-secondaryLigth cursor-pointer transition-colors rounded-xl xl:px-6'
      onClick={() => router.push(`/books/${id}`)}
    >
      <figure className='flex items-start my-4 flex-shrink-0 mr-3'>
        <img
          className='h-12 w-12 sm:w-14 sm:h-14 rounded-full'
          src={
            findUser?.findUserById
              ? findUser?.findUserById.me.photo
              : '/default-user.webp'
          }
          onClick={(event) => {
            event.stopPropagation()
            router.push(`/${findUser?.findUserById.me.username}`)
          }}
          alt={title}
        />
      </figure>
      <div className='w-full mt-3 xl:mt-4'>
        <Link href={`/${findUser?.findUserById.me.username}`}>
          <a
            onClick={(event) => {
              event.stopPropagation()
            }}
            className='flex items-center flex-row flex-wrap'
          >
            <header className='font-bold flex items-center whitespace-nowrap'>
              <h3 className='hover:underline'>{findUser?.findUserById.me.name}</h3>
              {findUser?.findUserById.me.verified && (
                <span>{icons.checkVeriFied}</span>
              )}
            </header>
            <span className='text-slate-400 whitespace-nowrap no-underline'>
              @{findUser?.findUserById.me.username} ·{' '}
              <time title={dateLong.toString()}>{timeago}</time>
            </span>
          </a>
        </Link>
        <div>
          <h4 className='text-lg text-thirdBlue'>
            {title} - {author}author...
          </h4>
          <p>{description}</p>
        </div>
        {image && (
          <div className='w-full flex mt-4'>
            <figure className='max-h-[500px] rounded-xl overflow-hidden relative bg-red-500'>
              <img
                className='h-full w-full object-cover rounded-xl object-top'
                src={image}
                alt={title}
              />
            </figure>
          </div>
        )}
        <div className='mb-3 xl:mb-4'></div>
      </div>
    </article>
  )
}

export default PostItem
