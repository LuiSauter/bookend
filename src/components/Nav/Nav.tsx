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
      <a className="cursor-pointer w-full md:w-max mx-2 transition-colors">
        <div
          title={name}
          className={`${visible} ${
            router.pathname === path
              ? `text-thirdBlue ${
                unique ? 'sm:bg-blue-500 sm:hover:bg-thirdBlue' : ''
              } sm:text-textWhite`
              : 'hover:bg-secondaryHover'
          } items-center justify-center w-full h-11 transition-colors
        sm:h-12 sm:w-12 sm:rounded-full sm:mt-4 md:mt-0
        md:h-8 md:w-8 md:hover:rounded-3xl`}
        >
          {children}
          <h2
            className={`${isPathName} font-medium text-sm md:pr-2 select-none`}
          >
            {name}
          </h2>
        </div>
      </a>
    </Link>
  )
}
