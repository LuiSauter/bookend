import React from 'react'

interface Props {
  n: number
  paddingY: string
  size: string
  font: string
}

export const PulsePosts = ({ n = 5, paddingY = 'py-4', size = 'h-12 w-12', font = 'h-2' }: Props) => {
  return (
    <div className='px-4 w-full flex flex-col mx-auto'>
      {[...Array(n)].map((_e, i) => (
        <div
          key={i}
          className={`animate-pulse ${paddingY} flex space-x-4 items-start px-1`}
        >
          <div
            className={`rounded-full dark:bg-slate-700 bg-sky-200 ${size}`}
          />
          <div className='flex-1 space-y-3 py-2'>
            <div className='space-y-3'>
              <div className='grid grid-cols-5 gap-4'>
                <div
                  className={`${font} dark:bg-slate-700 bg-sky-200 rounded col-span-2`}
                />
                <div
                  className={`${font} dark:bg-slate-700 bg-sky-200 rounded col-span-1`}
                />
                <div
                  className={`${font} dark:bg-slate-700 bg-sky-200 rounded col-span-1`}
                />
              </div>
            </div>
            <div className='flex flex-row flex-wrap gap-3'>
              <div className={`${font} dark:bg-slate-700 bg-sky-200 rounded w-5/6`} />
              <div className={`${font} dark:bg-slate-700 bg-sky-200 rounded w-1/4`} />
              <div className={`${font} dark:bg-slate-700 bg-sky-200 rounded w-3/5`} />
              <div className={`${font} dark:bg-slate-700 bg-sky-200 rounded w-1/2`} />
            </div>
            <div className='h-64 sm:h-72 dark:bg-slate-700 bg-sky-200 rounded-xl' />
          </div>
        </div>
      ))}
    </div>
  )
}