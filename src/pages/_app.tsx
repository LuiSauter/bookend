import type { AppProps, } from 'next/app'
import React from 'react'
import 'tailwindcss/tailwind.css'
import 'src/layouts/custom-scrollbar.css'

import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client'
import { SessionProvider } from 'next-auth/react'
import { Layout } from 'src/layouts/Layout'
import { LoginStateProvider } from 'src/context/login/LoginStateProvider'
import { ToggleStateProvider } from 'src/context/toggleModal/toggleContext'

const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: '/api/graphql',
  }),
})

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps): JSX.Element {
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <LoginStateProvider>
          <ToggleStateProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ToggleStateProvider>
        </LoginStateProvider>
      </ApolloProvider>
    </SessionProvider>
  )
}
export default MyApp
