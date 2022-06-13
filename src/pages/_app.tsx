import 'tailwindcss/tailwind.css'
import 'src/layouts/custom-scrollbar.css'
import 'src/styles/global-style.css'
import type { AppProps, } from 'next/app'
import React, { useCallback, useEffect, useState } from 'react'

import { SessionProvider } from 'next-auth/react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { languageStorage, themeStorage } from 'src/config/constants'
import { ApolloProvider } from '@apollo/client'
import { LoginStateProvider } from 'src/context/login/LoginContext'
import { ToggleStateProvider } from 'src/context/toggleModal/toggleContext'
import { Layout } from 'src/layouts/Layout'
import { getApolloClient } from 'src/data/apollo'
import { UserStateProvider } from 'src/context/User/UserContext'
import { LoadingPage } from 'src/layouts/LoadingPage'

const currentLanguageStorage =
  typeof window !== 'undefined' && window.localStorage.getItem(languageStorage)

const currentTheme =
  typeof window !== 'undefined' && window.localStorage.getItem(themeStorage)

if (currentTheme === null) {
  document.documentElement.classList.add('dark')
  window.localStorage.setItem(themeStorage, 'dark')
}

if (currentTheme === 'dark') {
  document.documentElement.classList.add('dark')
}

const waitForLoading = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

function MyApp({Component,pageProps: { session, ...pageProps }}: AppProps): JSX.Element {
  const client = getApolloClient()
  const [loading, setLoading] = useState(true)

  const getLoading = useCallback(async () => {
    if (typeof document !== 'undefined') {
      document.body.style.overflowY = 'hidden'
      await waitForLoading(200)
      setLoading(false)
      document.body.style.overflowY = 'auto'
    }
  }, [])

  let subscribe = true
  useEffect(() => {
    subscribe && getLoading()
    return () => {
      subscribe = false
    }
  }, [])

  useEffect(() => {
    if (subscribe) {
      if (typeof document !== 'undefined') {
        currentLanguageStorage === null && window.localStorage.setItem(languageStorage, 'es')
        document.querySelector('html')?.setAttribute('lang', 'es')
      }
    }
    return () => {
      subscribe = false
    }
  }, [currentLanguageStorage])

  return (
    <SessionProvider session={session}>
      {loading && <LoadingPage />}
      <ApolloProvider client={client}>
        <LoginStateProvider>
          <ToggleStateProvider>
            <UserStateProvider>
              <Layout>
                <Component {...pageProps} />
                <ToastContainer
                  position='top-right'
                  autoClose={2000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  toastClassName={() =>
                    'flex bg-secondary relative rounded-xl p-3 overflow-hidden text-white cursor-pointer shadow-3xl shadow-thirdBlue/20 m-4'
                  }
                />
              </Layout>
            </UserStateProvider>
          </ToggleStateProvider>
        </LoginStateProvider>
      </ApolloProvider>
    </SessionProvider>
  )
}
export default MyApp
