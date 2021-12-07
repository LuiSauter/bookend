import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'
import React from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className="bg-white dark:bg-black min-h-screen grid place-content-center">
      <Component {...pageProps} />
    </main>
  )
}

export default MyApp
