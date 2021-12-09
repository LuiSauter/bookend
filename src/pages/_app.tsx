import type { AppProps } from 'next/app'
import React from 'react'
import 'tailwindcss/tailwind.css'
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client'

const link = createHttpLink({
  uri: 'http://localhost:4000'
})

const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  link,
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <main className="bg-white dark:bg-black min-h-screen grid place-content-center">
        <Component {...pageProps} />
      </main>
    </ApolloProvider>
  )
}

export default MyApp
