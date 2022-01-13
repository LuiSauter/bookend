import { useRouter } from 'next/router'
import React from 'react'
import ClientOnly from 'src/components/ClientOnly'
import PostOptions from 'src/components/Modal/PostOptions'
import FindPost from 'src/components/Post/FindPost'
import { useToggleUser } from 'src/hooks/useToggleUser'

const index = () => {
  const router = useRouter()
  const id = router?.query?.id
  const { showOptions } = useToggleUser()
  return (
    <section>
      {id && (
        <ClientOnly>
          <FindPost id={id} />
        </ClientOnly>
      )}
      {showOptions && (
        <ClientOnly>
          <PostOptions />
        </ClientOnly>
      )}
    </section>
  )
}

export default index
