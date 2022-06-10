import { useRouter } from 'next/router'
import React from 'react'
import Link from 'next/link'

interface Props {
  children: JSX.Element | JSX.Element[];
  visible: string;
  path: string;
  name?: string;
  unique?: boolean;
}

export const Nav = ({ children, visible, path = '/', name, unique }: Props) => {
  const router = useRouter()
  const isPathName =
    router.pathname === path ? 'hidden md:flex font-bold' : 'hidden'
  return (
    <Link href={path} scroll={true}>
      <a className='cursor-pointer w-full h-full sm:h-auto md:w-min sm:mx-2 transition-all'>
        <div
          title={name}
          className={`${visible} ${
            router.pathname === path
              ? `text-thirdBlue ${
                unique
                  ? 'sm:bg-blue-500 h-full w-full sm:h-12 sm:w-12 sm:mt-4 sm:rounded-full sm:hover:bg-thirdBlue md:mt-0 md:w-min md:h-[32px] md:hover:h-[32px] md:rounded-2xl'
                  : ''
              } sm:text-textWhite`
              : 'dark:hover:bg-slate-300/20 hover:bg-sky-200/70 transition-all w-full h-full sm:mr-auto sm:h-12 sm:w-12 sm:rounded-full sm:mt-4 md:mt-0 md:h-10 md:w-10'
          } flex justify-center items-center`}
        >
          {children}
          <h2 className={`${isPathName} font-medium md:pr-2 select-none`}>
            {name}
          </h2>
        </div>
      </a>
    </Link>
  )
}
