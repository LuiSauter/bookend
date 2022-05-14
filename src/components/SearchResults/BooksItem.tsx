import { useRouter } from 'next/router'
import React from 'react'
import Link from 'next/link'
import { useTranslate } from 'src/hooks/useTranslate'
import Image from 'next/image'
import { usePlaceholder } from 'src/hooks/usePlaceholder'

type Props = {
  id: string | undefined
  image: string | undefined
  title: string | undefined
  description: string[] | undefined
  author: string | undefined
}

const BooksItem = ({ description, id, image, title, author }: Props) => {
  const router = useRouter()
  const createBlurDataUrl = usePlaceholder()
  const translate = useTranslate()
  return (
    <li
      onClick={() => {
        router.push(`/books/${id}`)
      }}
      className='flex flex-row p-4 dark:hover:bg-secondary hover:bg-sky-200/70 gap-4'
    >
      <figure className='w-20 min-h-[120px] my-auto aspect-book sm:w-32 md:w-24 flex flex-shrink-0 relative overflow-hidden rounded-lg shadow-lg'>
        <Image
          layout='fill'
          className='aspect-book'
          src={
            image
              ? image
              : 'https://i.giphy.com/media/3og0IFrHkIglEOg8Ba/giphy.webp'
          }
          placeholder='blur'
          blurDataURL={createBlurDataUrl({ w: 120, h: 200 })}
          alt={title}
        />
      </figure>
      <Link href={`/books/${id}`}>
        <a className='flex flex-col overflow-hidden w-full justify-evenly gap-1'>
          <div className='hover:underline font-semibold text-sm flex flex-col'>
            <h2 className='text-xl font-semibold'>{title}</h2>
          </div>
          <p className='text-thirdBlue text-sm'>
            <span className='dark:text-slate-300 text-black'>
              {translate.home.searchBook.author}{' '}
            </span>
            {author}
          </p>
          <div className='dark:text-slate-200 text-[15px] overflow-hidden sm:overflow-y-auto'>
            <p>
              {description && description.join(' ').length < 150
                ? description.join(' ')
                : description &&
                  description.join(' ').toString().substring(0, 150)}
              <span className='font-semibold'>
                ...{translate.home.searchBook.showMore}
              </span>
            </p>
          </div>
        </a>
      </Link>
    </li>
  )
}

export default BooksItem
