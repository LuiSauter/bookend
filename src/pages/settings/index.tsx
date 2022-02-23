import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import * as icons from 'src/assets/icons'

const data = [
  {
    id: 0,
    title: 'Tu cuenta',
    description:
      'Ve la informacion de tu cuenta y obtén más información acerca de las opciones de desactivación de la cuenta.',
    screen: 'account',
  },
  {
    id: 1,
    title: 'Pantalla y idiomas',
    description: 'Administra como vez el contenido en Bookend.',
    screen: 'display',
  },
  {
    id: 2,
    title: 'Tu actividad en Bookend',
    description:
      'Consulta la informacion sobre a quien seguiste y que post te gustaron.',
    screen: 'activity',
  },
  {
    id: 3,
    title: 'Reporta un problema',
    description:
      'Ayudanos a mejorar reportando un bug o problemas de rendimiento.',
    screen: 'contact',
  },
  {
    id: 4,
    title: 'Acerca de',
    description:
      'Que es bookend?, Esta es una idea original?, que tecnologias usamos?...',
    screen: 'about',
  },
]

function Settings() {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Bookend | Settings</title>
      </Head>
      <section>
        <h1 className='font-bold text-2xl p-4'>Settings</h1>
        <ul>
          {data.map((setting) => (
            <li
              key={setting.id}
              className='flex flex-row justify-between items-center gap-4 dark:hover:bg-secondaryHover hover:bg-sky-200 px-4 py-2 cursor-pointer'
              onClick={() => router.push(`/settings/${setting.screen}`)}
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