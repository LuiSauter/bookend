import React, { ReactElement } from 'react'
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'
import { getApolloClient } from 'src/data/apollo'

class MyDocument extends Document {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(props: any) {
    super(props)
    const { __NEXT_DATA__, apolloState } = props
    __NEXT_DATA__.apolloState = apolloState
  }
  static async getInitialProps(ctx: DocumentContext) {
    console.clear()
    const apolloClient = getApolloClient(true)
    const apolloState = apolloClient.extract()

    const originalRenderPage = ctx.renderPage
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => App,
        enhanceComponent: (Component) => Component,
      })
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps, apolloState }
  }
  render(): ReactElement {
    return (
      <Html className='dark:bg-primary scroll-smooth'>
        <Head>
          <meta
            name='description'
            content='Bookend es una aplicación web para compartir libros de ciencia, programación, física, universo, cuantica, espacio.'
          />
          <meta name='twitter:card' content='sumary' />
        </Head>
        <body className='dark:bg-primary'>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
