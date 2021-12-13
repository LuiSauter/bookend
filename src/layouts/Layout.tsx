import React from 'react'
import { NavBar } from 'src/components/Nav/NavBar'
import { LoadingPage } from './LoadingPage'

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const Layout = ({ children }: Props) => {
  return (
    <div className="relative bg-primary text-textWhite min-h-screen md:w-11/12 2xl:w-10/12 flex flex-col m-auto sm:flex-row sm:justify-center md:flex-col md:justify-start">
      <NavBar />

      <div className="flex flex-row items-start justify-evenly gap-4 sm:mt-4 xl:gap-6 2xl:gap-8">
        <section className="bg-red-600 hidden min-w-minAside max-w-aside sticky top-16 md:flex xl:max-w-maxAside">
          Profile Profile Profile Profile Profile Profile Profile Profile
        </section>
        <main className="max-w-post  xl:max-w-maxPost">
          {children ? children : <LoadingPage />}
        </main>
        <section className="bg-green-500 hidden max-w-aside min-w-minAside sticky top-16 lg:mr-4 lg:flex xl:max-w-maxAside xl:mr-0">
          trends trends trends trends trends trends trends trends trends trends
          trends trends trends trends trends trends trends trends trends trends
          trends trends trends trends trends trends trends trends trends trends
          trends trends trends trend
        </section>
      </div>
    </div>
  )
}
