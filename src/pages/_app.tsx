import type { AppProps } from 'next/app'
import React, { useEffect } from 'react'
import 'tailwindcss/tailwind.css'
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client'
import { SessionProvider, useSession } from 'next-auth/react'
import { Layout } from 'src/layouts/Layout'
import { useRouter } from 'next/router'
import { LoadingPage } from 'src/layouts/LoadingPage'
import { NavBar } from 'src/components/Nav/NavBar'

const link = createHttpLink({
  uri: 'http://localhost:4000'
})

const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  link,
})

interface Props {
  children: JSX.Element;
}

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps): JSX.Element {
  return (
    <SessionProvider session={session}>
      {Auth ? (
        <Auth>
          <ApolloProvider client={client}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ApolloProvider>
        </Auth>
      ) : (
        <LoadingPage />
      )}
    </SessionProvider>
  )
}

function Auth({ children }: Props) {
  const router = useRouter()
  const { data: session, status } = useSession()
  const isUser = !!session?.user

  useEffect(() => {
    console.log(status)
    if (status === 'loading') return
    if (!isUser) {
      router.replace('/')
    } else {
      router.replace('/home')
    }
  }, [isUser, status])

  return status === 'loading' ? <LoadingPage /> : children
}

export default MyApp
