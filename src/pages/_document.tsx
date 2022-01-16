// server rendering styeld-components :)
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
  constructor(props: any) {
    super(props)

    /**
     * Attach apolloState to the "global" __NEXT_DATA__ so we can populate the ApolloClient cache
     */
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
        // useful for wrapping the whole react tree
        enhanceApp: (App) => App,
        // useful for wrapping in a per-page basis
        enhanceComponent: (Component) => Component,
      })
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps, apolloState }
  }
  render(): ReactElement {
    return (
      <Html className='bg-primary scroll-smooth'>
        <Head>
          {/* <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
              `,
            }}
          /> */}
          {/* <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" /> */}
        </Head>
        <body className='bg-primary'>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
