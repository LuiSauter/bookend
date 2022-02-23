import React from 'react'
import { signIn } from 'next-auth/react'
import { useToggleUser } from 'src/hooks/useToggleUser'
import * as icons from 'src/assets/icons'

const LoginModal = () => {
  const { handleLoginOpen } = useToggleUser()

  const handleSignInWithGoogle = () => signIn('google')
  const handleSignInWithGitHub = () => signIn('github')

  return (
    <div className='w-full fixed bg-black/40 backdrop-blur-sm inset-0 transition-all overflow-hidden z-[10000]'>
      <div className='w-full h-screen grid place-content-center place-items-center'>
        <div className='dark:bg-secondary bg-slate-200 p-5 h-full sm:h-auto w-[80vw] sm:w-[60vw] lg:w-[500px] flex flex-col gap-6 transition rounded-xl shadow-2xl shadow-black/90'>
          <h2 className='flex items-center gap-2'>
            <button
              className='rounded-full hover:bg-secondaryLigth transition-colors hover:text-red-500 w-8 h-8 flex items-center justify-center'
              onClick={() => {
                handleLoginOpen()
              }}
            >
              {icons.exit}
            </button>
            Login required
          </h2>
          <div className='flex flex-col gap-4 sm:flex-row w-full relative mb-4'>
            <header className='text-thirdBlue relative h-full w-full sm:h-full flex flex-col justify-center items-center'>
              <span className='max-w-[200px] h-full'>{icons.bookendSvg}</span>
              <span className='text-center text-3xl font-bold font-sans'>Bookend</span>
            </header>
            <div className='w-full relative flex flex-col gap-4 items-center justify-center'>
              <button
                className='bg-white text-textGray hover:bg-sky-200 flex flex-row items-center rounded-lg w-11/12 justify-center py-1'
                onClick={handleSignInWithGoogle}
              >
                {icons.Google} with Google
              </button>
              <button
                className='bg-black text-textWhite hover:bg-opacity-60 flex flex-row items-center rounded-lg w-11/12 justify-center py-1'
                onClick={handleSignInWithGitHub}
              >
                {icons.github} with GitHub
              </button>
              <button
                className='bg-red-400 text-textWhite hover:bg-red-500 transition-colors w-11/12 justify-center flex flex-row items-center rounded-lg py-1'
                onClick={handleLoginOpen}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginModal
