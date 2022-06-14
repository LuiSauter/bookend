import React, { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'
import useTimeAgo from 'src/hooks/useTimeAgo'
import { FIND_USER_BY_USER } from 'src/users/graphql-queries'
import { useLazyQuery } from '@apollo/client'
import * as icons from 'src/assets/icons'
import { useRouter } from 'next/router'
import MultipleButtons from 'src/components/Button'
import PostOptions from '../Modal/PostOptions'
import PhotoUser from '../User/PhotoUser'

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

  let subscribe = true
  useEffect(() => {
    subscribe && user && getUserById({ variables: { user: user } })
    return () => {
      subscribe = false
    }
  }, [user])

  const toggleOptions = () => setShowOptions(false)

  const longDescription =
    description &&
    description.join('\n').toString().substring(0, 270).split('\n')

  return (
    <Fragment>
      {showOptions && <PostOptions id={id} toggleOptions={toggleOptions} />}
      <article
        key={id}
        className='w-full flex flex-row px-4 dark:sm:bg-secondary hover:bg-slate-200 sm:bg-slate-200 sm:hover:bg-sky-200/70 dark:bg-primary dark:sm:hover:bg-secondaryLigth border border-textGray/10 cursor-pointer transition-colors sm:rounded-xl xl:px-6'
        onClick={() => router.push(`/books/${id}`)}
      >
        <figure className='h-12 w-12 relative overflow-hidden rounded-full flex items-start my-4 flex-shrink-0 mr-3'>
          <PhotoUser
            onClick={(event) => {
              event.stopPropagation()
              router.push(`/${findUser?.findUserById.me.username}`)
            }}
            nameAlt={findUser?.findUserById.me.username}
            photoURL={findUser?.findUserById.me.photo}
            styles='rounded-full overflow-hidden'
            placeholder={true}
            priority={true}
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
                    <h3 className='hover:underline text-base'>
                      {findUser?.findUserById.me.name}
                    </h3>
                    {findUser?.findUserById.me.verified && (
                      <span title='Verified account'>
                        {icons.checkVeriFied}
                      </span>
                    )}
                  </header>
                  <span
                    translate='no'
                    className='dark:text-slate-400 text-slate-500 text-[15px] whitespace-nowrap no-underline'
                  >
                    @{findUser?.findUserById.me.username} ·
                    <time title={dateLong.toString()}> {timeago}</time>
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
              className='flex items-center text-slate-400 justify-center w-9 h-9 flex-shrink-0  dark:hover:bg-textGray/20 hover:bg-slate-300/70 rounded-full'
            >
              {icons.dotsHorizontal}
            </button>
          </div>
          <div>
            <h4 className='text-base text-thirdBlue'>
              {title} - {author}
            </h4>
            {description && (
              <p className='text-[16px] text-black dark:text-textWhite/90'>
                {description.join('\n').length < 270 ? (
                  description.map((text, index: number) => (
                    <span className='block mt-3 text-[16px]' key={index}>
                      {text}
                    </span>
                  ))
                ) : (
                  <>
                    {longDescription &&
                      longDescription.map((text, index: number) => (
                        <span className='block mt-3 text-[16px]' key={index}>
                          {text}
                          {index === longDescription.length - 1 && '...'}
                        </span>
                      ))}
                  </>
                )}
              </p>
            )}
          </div>
          <div className='w-full flex mt-4'>
            <figure className='max-h-[400px] h-96 w-full rounded-xl overflow-hidden relative border border-textGray/50'>
              <PhotoUser
                nameAlt={title}
                photoURL={image}
                styles='object-cover rounded-xl object-top'
                placeholder={true}
              />
            </figure>
          </div>
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
