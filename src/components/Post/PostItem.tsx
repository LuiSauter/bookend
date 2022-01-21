import React, { useEffect } from 'react'
import Link from 'next/link'
import useTimeAgo from 'src/hooks/useTimeAgo'
import { FIND_USER_BY_USER } from 'src/users/graphql-queries'
import { useLazyQuery } from '@apollo/client'
import * as icons from 'src/assets/icons'
import { useRouter } from 'next/router'
import { LoadingIcon } from 'src/assets/icons/LoadingIcon'
import BtnLike from 'src/components/Button/BtnLike'
import BtnComment from '../Button/BtnComment'

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
        {findUser?.findUserById ? (
          <Link href={`/${findUser?.findUserById.me.username}`}>
            <a
              onClick={(event) => {
                event.stopPropagation()
              }}
              className='flex items-center flex-row flex-wrap'
            >
              <header className='font-bold flex items-center whitespace-nowrap mr-1'>
                <h3 className='hover:underline'>
                  {findUser?.findUserById.me.name}
                </h3>
                {findUser?.findUserById.me.verified && (
                  <span>{icons.checkVeriFied}</span>
                )}
              </header>
              <span className='text-slate-400 text-[15px] whitespace-nowrap no-underline'>
                @{findUser?.findUserById.me.username} ·{' '}
                <time title={dateLong.toString()}>{timeago}</time>
              </span>
            </a>
          </Link>
        ) : (
          <span>Loading...</span>
        )}
        <div>
          <h4 className='text-base text-thirdBlue'>
            {title} - {author}author...
          </h4>
          <p className='text-[15px]'>{description}</p>
        </div>
        {image ? (
          <div className='w-full flex mt-4'>
            <figure className='max-h-[500px] rounded-xl overflow-hidden relative bg-red-500'>
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
        <div className='flex sm:w-[85%] my-2 justify-between text-slate-400'>
          <BtnComment
            bgColor={'bg-thirdBlue/10'}
            textColor={'hover:text-thirdBlue'}
            comments={comments?.length}
            title={'comments'}
          >
            {icons.message}
          </BtnComment>
          <BtnLike id={id} likes={likes?.length} />
          <BtnComment
            bgColor={'bg-teal-500/10'}
            textColor={'hover:text-teal-500'}
            title={'share'}
          >
            {icons.share}
          </BtnComment>
          <BtnComment
            bgColor={'bg-yellow-500/10'}
            textColor={'hover:text-yellow-500'}
            title={'download'}
          >
            {icons.download}
          </BtnComment>
        </div>
      </div>
    </article>
  )
}

export default PostItem
