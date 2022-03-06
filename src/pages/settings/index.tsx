import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import * as icons from 'src/assets/icons'
import { useTranslate } from 'src/hooks/useTranslate'

function Settings() {
  const router = useRouter()
  const translate = useTranslate()
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

  return (
    <>
      <Head>
        <title>Bookend | {translate.setting.name}</title>
      </Head>
      <section>
        <header className='flex items-center py-4 px-2'>
          <button
            onClick={() => router.back()}
            className='rounded-full dark:hover:bg-secondaryLigth/80 hover:bg-sky-200 p-2'
          >
            {icons.arrowLeft}
          </button>
          <h1 className='font-bold text-2xl pl-4'>{translate.setting.name}</h1>
        </header>
        <ul>
          {data.map((setting) => (
            <li
              key={setting.id}
              className={`${
                setting.screen !== '' ? 'cursor-pointer' : 'cursor-default'
              } flex flex-row justify-between items-center gap-4 dark:hover:bg-secondaryHover hover:bg-sky-200 px-4 py-2`}
              onClick={() =>
                setting.screen !== '' &&
                router.push(`/settings/${setting.screen}`)
              }
            >
              <div className='flex flex-col'>
                <h3 className='text-lg font-semibold'>{setting.title}</h3>
                <p className='text-textGray'>{setting.description}</p>
              </div>
              <span className='text-textGray'>{icons.arrowRight}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

export default Settings