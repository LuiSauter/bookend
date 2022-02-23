import { useRouter } from 'next/router'
import React from 'react'
import Link from 'next/link'

type Props = {
  id: string | undefined
  image: string | undefined
  title: string | undefined
  description: string[] | undefined
  author: string | undefined
}

const BooksItem = ({ description, id, image, title, author }: Props) => {
  const router = useRouter()
  return (
    <li
      onClick={() => {
        router.push(`/books/${id}`)
        // setShowResults(false)
      }}
      className='flex flex-row p-4 dark:hover:bg-secondary hover:bg-sky-200 gap-4'
    >
      <img
        className='aspect-book w-20 h-full my-auto rounded-lg shadow-lg sm:w-32 md:w-24'
        src={image}
        alt={title}
      />
      <Link href={`/books/${id}`}>
        <a className='flex flex-col overflow-hidden w-full justify-evenly gap-1'>
          <div className='hover:underline font-semibold text-sm flex flex-col'>
            <h2 className='text-xl font-semibold'>{title}</h2>
          </div>
          <p className='text-thirdBlue text-sm'>
            <span className='dark:text-slate-300 text-black'>Autor: </span>
            {author}
          </p>
          <div className='dark:text-slate-200 text-[15px] overflow-hidden sm:overflow-y-auto'>
            {description && description.length > 160 && (
              <p>
                {description.toString().substring(0, 150)}
                <span className='font-semibold'>...Ver más</span>
              </p>
            )}
            {description && description.length < 160 && description}
          </div>
        </a>
      </Link>
    </li>
  )
}

export default BooksItem
