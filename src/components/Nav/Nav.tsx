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

export const Nav = ({ children, visible, path, name, unique }: Props) => {
  const router = useRouter()
  const isPathName =
    router.pathname === path ? 'hidden md:flex font-bold' : 'hidden'
  return (
    <Link href={path || ''}>
      <a className='cursor-pointer w-full md:w-min sm:mx-2 transition-colors'>
        <div
          title={name}
          className={`${visible} ${
            router.pathname === path
              ? `text-thirdBlue ${
                unique
                  ? 'sm:bg-blue-500 h-full sm:h-12 sm:w-12 sm:mt-4 sm:rounded-full sm:hover:bg-thirdBlue md:mt-0 md:w-min md:h-[32px] md:hover:h-[32px] md:rounded-2xl'
                  : ''
              } sm:text-textWhite`
              : 'hover:bg-secondaryHover/70 w-full h-full mr-auto sm:h-12 sm:w-12 sm:rounded-full sm:mt-4 md:mt-0 md:h-10 md:w-10'
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
