
// server rendering styeld-components :)
import React, { ReactElement } from 'react'
import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render(): ReactElement {
    return (
      <Html className="bg-white dark:bg-primary">
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
        </Head>
        <body className="bg-white dark:bg-primary">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument