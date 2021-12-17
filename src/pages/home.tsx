import { useMutation } from '@apollo/client'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import ProfileForm from 'src/components/ProfileForm/ProfileForm'
import { LOGINQL } from 'src/login/graphql-mutations'
import { FIND_PROFILE } from 'src/users/graphql-queries'
interface UserLogin {
  name: string | null | undefined;
  email: string | null | undefined;
  image: string | null | undefined;
}

const initialState = {
  email: '',
  id: '',
  message: '',
  name: '',
  profile: '',
}

const Home = (): JSX.Element => {
  const { data: session, status } = useSession()
  const [profileData, setProfileData] = useState<LoginProfile>(initialState)
  const [userLogin, setUserLogin] = useState<UserLogin>({} as UserLogin)
  const [getLogin, { data }] = useMutation(LOGINQL)
  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      if (status === 'authenticated') {
        setUserLogin({
          name: session?.user?.name,
          email: session?.user?.email,
          image: session?.user?.image,
        })
      }
    }
    return () => {
      cleanup = false
    }
  }, [status === 'authenticated'])

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      const { email, image, name } = userLogin
      if (userLogin.email !== undefined) {
        getLogin({ variables: { email, name, image } })
      }
    }
    return () => {
      cleanup = false
    }
  }, [userLogin.email])

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      setProfileData(data?.signin)
    }
    return () => {
      cleanup = false
    }
  }, [data?.signin])
  return (
    <>
      {profileData && profileData?.message !== 'signup' ? (
        <ProfileForm profileData={profileData} image={userLogin.image} />
      ) : (
        <article className="w-full bg-secondary flex flex-row p-4 relative gap-4">
          <figure className="m-0">
            <img src="/default-user.webp" width={200} alt="" />
          </figure>
          <div>
            <h2>Sauter</h2>
            <span className="text-textGray text-sm">few minutes ago</span>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde
              aperiam tenetur nemo enim voluptatem odio voluptate? Voluptatibus
              id adipisci facilis. Facilis, iste! Tempore optio quisquam,
              voluptas ullam sint nostrum adipisci!
            </p>
            <span>bu as xd 1213k</span>
          </div>
        </article>
      )}
    </>
  )
}
export default Home

// export const getStaticProps = async () => {
//   const res = await axios.post('http://localhost:3000/api/graphql', )
//   console.log(res.data)
//   return {
//     props: {}
//   }
// }