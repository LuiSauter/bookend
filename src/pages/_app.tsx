import type { AppProps, } from 'next/app'
import React from 'react'
import 'tailwindcss/tailwind.css'
import 'src/layouts/custom-scrollbar.css'

import { ApolloProvider } from '@apollo/client'
import { getApolloClient } from 'src/data/apollo'
import { SessionProvider } from 'next-auth/react'
import { Layout } from 'src/layouts/Layout'
import { LoginStateProvider } from 'src/context/login/LoginStateProvider'
import { ToggleStateProvider } from 'src/context/toggleModal/toggleContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// const client = new ApolloClient({
//   connectToDevTools: true,
//   cache: new InMemoryCache(),
//   link: new HttpLink({
//     uri: '/api/graphql',
//   }),
// })

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps): JSX.Element {
  const client = getApolloClient()

  return (
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
                  'flex bg-secondary relative rounded-xl p-3 overflow-hidden text-white cursor-pointer shadow-3xl shadow-thirdBlue/10 mb-4'
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
