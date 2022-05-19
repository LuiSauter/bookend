import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import * as icons from 'src/assets/icons'
import { GraphqlApolloCLient } from 'src/data/ApolloClient'
import { useStaticUsers } from 'src/hooks/useStaticUsers'
import { useTranslate } from 'src/hooks/useTranslate'
import { IUser } from 'src/interfaces/Users'
import { ALL_USERS } from 'src/users/graphql-queries'

type Props = {
  users: { allUsers: IUser[] }
}
function Settings({users}:Props) {
  const router = useRouter()
  const translate = useTranslate()
  const { addUsers, userState } = useStaticUsers()

  useEffect(() => {
    let cleanup = true
    if (cleanup && userState.users.length === 0) {
      users && addUsers(users?.allUsers)
    }
    return () => {
      cleanup = false
    }
  }, [users])

  const data = [
    {
      id: 0,
      title: translate.setting.yourAccount,
      description: translate.setting.yourAccountP,
      screen: '',
    },
    {
      id: 1,
      title: translate.setting.display,
      description: translate.setting.displayP,
      screen: 'display',
    },
    {
      id: 2,
      title: translate.setting.activity,
      description: translate.setting.activityP,
      screen: '',
    },
    {
      id: 3,
      title: translate.setting.report,
      description: translate.setting.reportP,
      screen: '',
    },
    {
      id: 4,
      title: translate.about.name,
      description: translate.setting.about,
      screen: 'about',
    },
  ]

  const handleBack = () => {
    history.length <= 2 ? router.push('/') : router.back()
  }

  return (
    <>
      <Head>
        <title>Bookend | {translate.setting.name}</title>
      </Head>
      <section>
        <header className='flex items-center py-4 px-2 md:pt-0'>
          <button
            onClick={handleBack}
            className='rounded-full dark:hover:bg-secondaryLigth/80 hover:bg-sky-200/70 p-2'
          >
            {icons.arrowLeft}
          </button>
          <h1 className='font-bold text-2xl pl-4'>{translate.setting.name}</h1>
        </header>
        <ul className='md:pr-4 xl:pr-0'>
          {data.map((setting) => (
            <li
              key={setting.id}
              className={`${
                setting.screen !== '' ? 'cursor-pointer' : 'cursor-default'
              } flex flex-row sm:rounded-xl xl:rounded-none justify-between items-center gap-4 dark:hover:bg-secondaryHover hover:bg-sky-200/70 px-4 py-2`}
              onClick={() =>
                setting.screen !== '' &&
                router.push(`/settings/${setting.screen}`)
              }
            >
              <div className='flex flex-col'>
                <h3 className='text-xl font-semibold'>{setting.title}</h3>
                <p className='dark:text-slate-400 text-base text-slate-700'>{setting.description}</p>
              </div>
              <span className='dark:text-slate-400'>{icons.arrowRight}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

export async function getStaticProps() {
  const client = GraphqlApolloCLient()
  const { data } = await client.query({ query: ALL_USERS })
  return {
    props: { users: data },
    revalidate: 10,
  }
}

export default Settings
