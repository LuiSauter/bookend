import type { AppProps, } from 'next/app'
import React, { useCallback, useEffect, useState } from 'react'
import 'tailwindcss/tailwind.css'
import 'src/layouts/custom-scrollbar.css'
import 'src/styles/global-style.css'

import { ApolloProvider } from '@apollo/client'
import { getApolloClient } from 'src/data/apollo'
import { SessionProvider } from 'next-auth/react'
import { Layout } from 'src/layouts/Layout'
import { LoginStateProvider } from 'src/context/login/LoginContext'
import { ToggleStateProvider } from 'src/context/toggleModal/toggleContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { LoadingPage } from 'src/layouts/LoadingPage'
import { languageStorage, themeStorage } from 'src/config/constants'

const currentLanguageStorage =
  typeof window !== 'undefined' && window.localStorage.getItem(languageStorage)

const waitFor = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

const currentTheme =
  typeof window !== 'undefined' && window.localStorage.getItem(themeStorage)

if (currentTheme === null) {
  document.documentElement.classList.add('dark')
  window.localStorage.setItem(themeStorage, 'dark')
}

if (currentTheme === 'dark') {
  document.documentElement.classList.add('dark')
}

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps): JSX.Element {
  const [loading, setLoading] = useState(true)
  const client = getApolloClient()

  const getLoading = useCallback(async () => {
    await waitFor(300)
    setLoading(false)
  }, [])

  useEffect(() => {
    let cleanup = true
    if (cleanup) getLoading()
    return () => {
      cleanup = false
    }
  }, [])

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      typeof window !== 'undefined' &&
        currentLanguageStorage === null &&
        window.localStorage.setItem(languageStorage, 'es')
    }
    return () => {
      cleanup = false
    }
  }, [currentLanguageStorage])

  return loading ? (
    <LoadingPage />
  ) : (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <LoginStateProvider>
          <ToggleStateProvider>
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
                  'flex bg-secondary relative rounded-xl p-3 overflow-hidden text-white cursor-pointer shadow-3xl shadow-thirdBlue/10 m-4'
                }
              />
            </Layout>
          </ToggleStateProvider>
        </LoginStateProvider>
      </ApolloProvider>
    </SessionProvider>
  )
}
export default MyApp
