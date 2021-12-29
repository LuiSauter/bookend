import { useRouter } from 'next/router'
import React from 'react'
import ClientOnly from 'src/components/ClientOnly'
import FindPost from 'src/components/Post/FindPost'

const index = () => {
  const router = useRouter()
  const id = router?.query?.id
  return (
    <section>
      {id && (
        <ClientOnly>
          <FindPost id={id} />
        </ClientOnly>
      )}
    </section>
  )
}

export default index
