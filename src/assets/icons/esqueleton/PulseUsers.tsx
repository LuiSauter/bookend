import React from 'react'

type Props = {
  size: string
  n: number
  font: string
  paddingY: string
}

const PulseUsers = ({ size = 'h-11 w-11', n = 5, font = 'h-2', paddingY = 'py-2' }: Props) => {
  return (
    <div className='px-4 w-full flex flex-col mx-auto'>
      {[...Array(n)].map((_e, i) => (
        <div
          key={i}
          className={`animate-pulse ${paddingY} flex space-x-4 items-center`}
        >
          <div
            className={`rounded-full dark:bg-slate-700 bg-sky-200 ${size}`}
          />
          <div className='flex-1 space-y-3 py-1'>
            <div className={`${font} dark:bg-slate-700 bg-sky-200 rounded`} />
            <div className='space-y-3'>
              <div className='grid grid-cols-3 gap-4'>
                <div
                  className={`${font} dark:bg-slate-700 bg-sky-200 rounded col-span-2`}
                />
                <div
                  className={`${font} dark:bg-slate-700 bg-sky-200 rounded col-span-1`}
                />
              </div>
              {/* <div className='h-2 dark:bg-slate-700 bg-sky-200 rounded'></div> */}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PulseUsers