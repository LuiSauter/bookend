/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Fragment, useEffect } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

import * as icons from 'src/assets/icons'
import { useTranslate } from 'src/hooks/useTranslate'
import { FIND_USER } from 'src/users/graphql-queries'
import Button from '../Button/Button'
import { DELETE_POST } from 'src/post/graphql-mutations'

interface Props {
  id: string | undefined
  toggleOptions?: () => void
}

const PostOptions = ({ id, toggleOptions }: Props) => {
  const router = useRouter()
  const { data: session } = useSession()
  const translate = useTranslate()
  const [getUserByEmail, { data }] = useLazyQuery(FIND_USER)
  const [deletePost] = useMutation(DELETE_POST)

  let subscribe = true
  useEffect(() => {
    if (subscribe) {
      session?.user?.email && getUserByEmail({ variables: { email: session?.user?.email } })
    }
    return () => {
      subscribe = false
    }
  }, [session?.user])

  const isMatch = data?.findUser.post.some((p:string) => p === id)

  const handleBack = () =>
    history.length <= 2 ? router.push('/') : router.back()

  const openDialog = () => {
    const dialog: any = document.querySelector('dialog')
    dialog && dialog.showModal()
  }

  const handleDeletePost = () => {
    const dialog: any = document.querySelector('dialog')
    deletePost({ variables: { id: id, user: data?.findUser.me.user } })
    dialog && dialog.close()
    handleBack()
  }

  const closeDialog = () => {
    const dialog: any = document.querySelector('dialog')
    dialog && dialog.close()
  }

  return (
    <Fragment>
      <dialog className='h-min p-6 xl:p-8 flex-col gap-4 items-end dark:bg-secondary rounded-xl ring-2 ring-thirdBlue shadow-3xl shadow-thirdBlue/50'>
        <h1 className='dark:text-white pb-4 flex items-center gap-1'>
          {icons.alert}
          {translate.home.postOptions.dialog}
        </h1>
        <div className='flex flex-row justify-end items-center gap-4'>
          <button
            className='ring-2 ring-slate-400 rounded-lg px-4 w-14 dark:text-white dark:hover:bg-thirdBlue dark:hover:ring-thirdBlue transition-colors hover:bg-thirdBlue hover:ring-thirdBlue hover:text-white'
            onClick={handleDeletePost}
          >
            {translate.home.postOptions.dialogYes}
          </button>
          <button
            className='ring-2 ring-slate-400 rounded-lg px-4 w-14 dark:text-white dark:hover:bg-red-500 dark:hover:ring-red-500 transition-colors hover:ring-red-500 hover:text-white hover:bg-red-500'
            onClick={closeDialog}
          >
            No
          </button>
        </div>
      </dialog>
      <div className='fixed inset-0 w-full h-full grid place-content-center place-items-center z-[80]'>
        <div className='dark:bg-secondary bg-sky-100 rounded-xl p-8 gap-2 flex flex-col w-[80vw] h-min z-[90] transition-all sm:w-80'>
          <Button
            onClick={() => console.log('button not available')}
            color={'dark:hover:bg-secondaryLigth hover:bg-sky-200/70'}
          >
            {translate.home.postOptions.report}
          </Button>
          <Button
            onClick={() => console.log('button not available')}
            color={'dark:hover:bg-secondaryLigth hover:bg-sky-200/70'}
          >
            {translate.home.postOptions.share}
          </Button>
          {data?.findUser.verified && isMatch && (
            <Fragment>
              <Button
                onClick={() => router.push(`/books/new/${id}`)}
                color={'dark:hover:bg-secondaryLigth hover:bg-sky-200/70'}
              >
                {translate.home.postOptions.edit}
              </Button>
              <Button
                onClick={openDialog}
                color={
                  'dark:hover:bg-secondaryLigth hover:bg-sky-200/70 text-red-500'
                }
              >
                {translate.home.postOptions.delete}
              </Button>
            </Fragment>
          )}
          <Button
            onClick={toggleOptions}
            color={'bg-red-500 text-white hover:bg-red-400'}
          >
            {translate.home.postOptions.cancel}
          </Button>
        </div>
        <div
          onClick={toggleOptions}
          className='fixed top-0 left-0 right-0 bg-black/50 transition-all h-screen w-full z-[80]'
        />
      </div>
    </Fragment>
  )
}

export default PostOptions
