import React, { useEffect } from 'react'
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'

const Login = () => {
  // const router = useRouter()
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      status === 'authenticated' && router.push('/home')
    }
    return () => {
      cleanup = false
    }
  }, [status === 'authenticated'])

  const handleSignIn = async () => {
    return await signIn('', { callbackUrl: '/home' })
  }
  const authentication = (
    <>
      <figure className="grid place-items-center transition-all min-h-screen  absolute bg-primary inset-0 z-50">
        <img src="/images/bookend-logo.png" alt="" />
      </figure>
    </>
  )
  const noAuthentication = (
    <section className="md:relative bg-primary min-h-screen -mt-4 h-full grid place-content-center place-items-center z-10 overflow-hidden absolute inset-0">
      <figure className="mx-auto">
        <img className="max-w-xs" src="/images/bookend-logo.png" alt="" />
      </figure>
      <h1 className="text-3xl text-center">Welcome to Bookend</h1>
      <h2 className="text-xl text-center">
        a social network for sharing Books
      </h2>
      <button
        className="bg-thirdBlue rounded-2xl text-textWhite font-semibold px-5 py-1 m-3 hover:bg-blue-500 transition-colors"
        onClick={handleSignIn}
      >
        Sing in
      </button>
      <span className="text-center text-xs text-textGray mb-9">
        Sign in with google or github
      </span>
      <nav className="z-20 flex h-11 items-center justify-center gap-4 absolute bottom-0">
        <div className="text-textGray border-dashed border-b border-textGray">
          <button
            className="text-base font-semibold w-full h-full transition-colors hover:text-textWhite"
            onClick={() => signIn('', { callbackUrl: '/home' })}
          >
            signin
          </button>
        </div>
        <div className="">
          <p className="text-textGray border-dashed border-b border-textGray">
            create by:{' '}
            <Link href="https://sauterdev.vercel.app">
              <a className="font-semibold hover:text-textWhite" target="_blank">
                sauterdev
              </a>
            </Link>
          </p>
        </div>
      </nav>
    </section>
  )
  return (
    <>
      <Head>
        <title>Bookend | Login</title>
        <meta
          name="description"
          content="In Bookend you will find many digital books totally free."
        />
      </Head>
      {status === 'unauthenticated' ? noAuthentication : authentication}
    </>
  )
}
export default Login
