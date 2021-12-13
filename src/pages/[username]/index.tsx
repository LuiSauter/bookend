import { useRouter } from 'next/router'
import React from 'react'

interface Props {
  params: string;
  username: string;
}

const Profile = (props: Props) => {
  const router = useRouter()
  const { username } = router.query
  if (username) {
    // router.push('/404')
  }
  return <h1>hello Profile {username}</h1>
}
export default Profile
