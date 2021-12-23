import { useLazyQuery, useMutation } from '@apollo/client'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import Footer from 'src/components/Footer'
import ProfileForm from 'src/components/ProfileForm/ProfileForm'
import { LOGINQL } from 'src/login/graphql-mutations'
import { ALL_USERS, FIND_USER } from 'src/users/graphql-queries'

const Home = (): JSX.Element => {
  const { data: session, status } = useSession()
  const [getLogin, { data }] = useMutation(LOGINQL, {
    refetchQueries: [
      { query: FIND_USER, variables: { email: session?.user?.email } },
      { query: ALL_USERS },
    ],
  })
  const [getProfile, { data: findData }] = useLazyQuery(FIND_USER)
  const [updateProfile, setUpdateProfile] = useState<boolean>(true)

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      if (status === 'authenticated') {
        getLogin({
          variables: {
            name: session?.user?.name,
            email: session?.user?.email,
            image: session?.user?.image,
          },
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
      if (session?.user?.email) {
        getProfile({ variables: { email: session?.user?.email } })
      }
    }
    return () => {
      cleanup = false
    }
  }, [data?.signin])

  const handleClickArrowLeft = () => {
    setUpdateProfile(!updateProfile)
  }

  return (
    <>
      {data?.signin && data?.signin?.message === 'signup' ? (
        findData?.findUser &&
        updateProfile && (
          <ProfileForm
            profileData={findData?.findUser}
            onClick={handleClickArrowLeft}
          />
        )
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
                Lorem ipsum doloLorem ipsum dolor sit, amet consectetur
                adipisicing elit. Unde aperiam tenetur nemo enim voluptatem odio
                voluptate? Voluptatibus id adipisci facilis. Facilis, iste!
                Tempore optio quisquam, voluptas ullam sint nostrum adipisci!
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
          <footer className="w-full py-4 flex justify-center lg:hidden">
            <Footer />
          </footer>
        </>
      )}
    </>
  )
}
export default Home
