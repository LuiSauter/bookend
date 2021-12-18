import type { AppProps, } from 'next/app'
import React, { useEffect } from 'react'
import 'tailwindcss/tailwind.css'
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client'
import { SessionProvider, useSession } from 'next-auth/react'
import { Layout } from 'src/layouts/Layout'
import { LoginStateProvider } from 'src/context/login/LoginStateProvider'
import { useRouter } from 'next/router'
import { ToggleStateProvider } from 'src/context/toggleModal/toggleContext'

const link = createHttpLink({
  uri: '/api/graphql',
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
      <Auth>
        <LoginStateProvider>
          <ApolloProvider client={client}>
            <ToggleStateProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ToggleStateProvider>
          </ApolloProvider>
        </LoginStateProvider>
      </Auth>
    </SessionProvider>
  )
}
export default MyApp

function Auth({ children }: Props) {
  const router = useRouter()
  const { data: session, status } = useSession()
  const isUser = !!session?.user

  useEffect(() => {
    if (status === 'loading') return
    if (!isUser) {
      router.replace('/')
    }
  }, [isUser, status])

  if (isUser) {
    return children
  }

  return children
}
