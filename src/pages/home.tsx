import { useLazyQuery, useMutation } from '@apollo/client'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import ProfileForm from 'src/components/ProfileForm/ProfileForm'
import { useProfileId } from 'src/hooks/useProfileId'
import { LOGINQL } from 'src/login/graphql-mutations'
import { FIND_USER } from 'src/users/graphql-queries'

interface UserLogin {
  name: string | null | undefined;
  email: string | null | undefined;
  image: string | null | undefined;
}

const Home = (): JSX.Element => {
  const [dataUser, setDataUser] = useState<any>()
  const [userLogin, setUserLogin] = useState<UserLogin>({} as UserLogin)
  const { setProfileId } = useProfileId()
  const { data: session, status } = useSession()
  const [getLogin, { data }] = useMutation(LOGINQL)
  const [getProfile, { data: findData }] = useLazyQuery(FIND_USER)
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
      if (userLogin.email) {
        const { email, image, name } = userLogin
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
      setProfileId(data?.signin?.profile)
      localStorage.setItem('profileId', data?.signin?.profile)
      setDataUser(data?.signin)
      data?.signin &&
        getProfile({ variables: { profile: data?.signin?.profile } })
    }
    return () => {
      cleanup = false
    }
  }, [data?.signin])
  return (
    <>
      {dataUser && dataUser?.message === 'signup' ? (
        findData?.findUser && <ProfileForm profileData={findData?.findUser} />
      ) : (
        <>
          <article className="w-full bg-secondary flex flex-row p-4 relative gap-4">
            <figure className="m-0">
              <img src="/default-user.webp" width={200} alt="" />
            </figure>
            <div>
              <h2>Sauter</h2>
              <span className="text-textGray text-sm">few minutes ago</span>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde
                aperiam tenetur nemo enim voluptatem odio voluptate?
                Voluptatibus id adipisci facilis. Facilis, iste! Tempore optio
                quisquam, voluptas ullam sint nostrum adipisci!
              </p>
              <span>bu as xd 1213k</span>
            </div>
          </article>
          <article className="w-full bg-secondary flex flex-row p-4 relative gap-4">
            <figure className="m-0">
              <img src="/default-user.webp" width={200} alt="" />
            </figure>
            <div>
              <h2>Sauter</h2>
              <span className="text-textGray text-sm">few minutes ago</span>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde
                aperiam tenetur nemo enim voluptatem odio voluptate?
                Voluptatibus id adipisci facilis. Facilis, iste! Tempore optio
                quisquam, voluptas ullam sint nostrum adipisci!
              </p>
              <span>bu as xd 1213k</span>
            </div>
          </article>
          <article className="w-full bg-secondary flex flex-row p-4 relative gap-4">
            <figure className="m-0">
              <img src="/default-user.webp" width={200} alt="" />
            </figure>
            <div>
              <h2>Sauter</h2>
              <span className="text-textGray text-sm">few minutes ago</span>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde
                aperiam tenetur nemo enim voluptatem odio voluptate?
                Voluptatibus id adipisci facilis. Facilis, iste! Tempore optio
                quisquam, voluptas ullam sint nostrum adipisci!
              </p>
              <span>bu as xd 1213k</span>
            </div>
          </article>
        </>
      )}
    </>
  )
}
export default Home
