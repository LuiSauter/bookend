import React, { useState } from 'react'
import { useSession, signIn, signOut, getSession } from 'next-auth/react'
import { useRouter } from 'next/router'

// const [darkMode, setDarkMode] = useState(false)
// const handleClick = () => {
//   document.documentElement.classList.toggle('dark')
//   setDarkMode(!darkMode)
// }
// const text = !darkMode ? 'dark mode' : 'light mode'
const Login = () => {
  // const router = useRouter()
  const { data: session, status } = useSession()
  // const handleSignOut = async () => {
  //   const data = await signOut({ redirect: false, callbackUrl: '/' })
  //   return router.replace(data?.url)
  // }
  const handleSignIn = async () => {
    return await signIn('', { callbackUrl: '/home' })
  }
  // console.log(status)
  const authentication = (
    <>
      <figure className="mx-auto transition-all">
        <img src="/images/bookend-logo.png" alt="" />
      </figure>
      {/* <h2>Signed in as {session?.user?.email}</h2>
      {session?.user?.image && (
        <img src={session?.user?.image} width={150} alt="xd" />
      )}
      <p>{session?.user?.name}</p>
      <button
        className="bg-blue-700 rounded-2xl text-white px-5 py-1"
        onClick={handleSignOut}
      >
        Sign out
      </button> */}
    </>
  )
  const noAuthentication = (
    <section className="bg-primary min-h-screen w-screen grid place-content-center z-10 overflow-hidden absolute inset-0">
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
      <span className="text-center text-xs text-textGray">
        Sign in with google or github
      </span>
    </section>
  )
  return status === 'authenticated' ? authentication : noAuthentication
}
export default Login

// export async function getServerSideProps(ctx: any) {
//   return {
//     props: {
//       session: await getSession(ctx),
//     },
//   }
// }
