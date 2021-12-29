import { useLazyQuery, useQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import { FINDONE_POST } from 'src/post/graphql-queries'
import * as icons from 'src/assets/icons'
import { useRouter } from 'next/router'
import { FIND_USER_BY_USER } from 'src/users/graphql-queries'
import Head from 'next/head'
interface Props {
  id: string | string[];
}

const FindPost = ({ id }: Props) => {
  const [getPostById, { data, loading }] = useLazyQuery(FINDONE_POST)
  const [getUserById, { data: findUser }] = useLazyQuery(FIND_USER_BY_USER)
  const router = useRouter()

  useEffect(() => {
    const cleanup = true
    if (cleanup) {
      id &&
        getPostById({
          variables: { id: id },
        })
    }
    return () => {
      cleanup
    }
  }, [id])

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      if (data?.findPost.user) {
        console.log('inside')
        getUserById({ variables: { user: data?.findPost?.user } })
      }
    }
    return () => {
      cleanup = false
    }
  }, [data?.findPost])

  console.log(data)

  return (
    <>
      <Head>
        <title>
          Bookend | {data?.findPost.title ? data?.findPost.title : 'Loading'}
        </title>
      </Head>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <article className="w-full bg-secondary p-4 rounded-xl">
          <div className="flex items-center gap-4">
            <button
              className="rounded-full hover:bg-secondaryLigth flex h-9 w-9 items-center justify-center"
              onClick={() => router.back()}
            >
              {icons.arrowLeft}
            </button>
            <span className="text-xl font-semibold">Book</span>
          </div>
          <div className="flex flex-row my-4 gap-4 justify-start">
            <header className="flex flex-col items-center gap-4">
              <figure className="m-0 rounded-lg overflow-hidden aspect-[160/230] w-40 sm:w-48 xl:w-52">
                <img
                  className="w-full h-full rounded-lg object-cover object-center"
                  src={data?.findPost.image}
                  alt={data?.findPost.title}
                />
              </figure>
            </header>
            <div className="w-full flex flex-col gap-4 justify-center">
              <h1 className="text-xl font-semibold">{data?.findPost.title}</h1>
              <p>
                <span className="text-slate-500">Autor:</span>{' '}
                {data?.findPost.description[1]}
              </p>
              <p className="text-slate-400">{data?.findPost.description[0]}</p>
              <div className="flex items-center flex-row flex-wrap gap-3">
                <div className="bg-secondaryLigth rounded-lg flex items-center gap-2 px-2 py-1 select-none">
                  <button className="hover:text-red-500 active:scale-125 active:-rotate-12 transition-all">
                    {icons.heart}
                  </button>
                  favoritos
                </div>
                <button className="flex items-center bg-black/30 py-2 px-4 rounded-xl gap-3 hover:bg-secondaryLigth hover:shadow-md hover:shadow-black-600/30">
                  <span>{icons.googDrive}</span>Google drive PDF
                </button>
                {findUser?.findUserById && (
                  <div className="flex flex-row gap-4 justify-center p-3 rounded-xl items-center bg-secondaryLigth">
                    <figure className="w-9 h-9 rounded-full overflow-hidden">
                      <img
                        className="w-full rounded-full"
                        src={findUser?.findUserById?.me.photo}
                        alt={findUser?.findUserById?.me.name}
                      />
                    </figure>
                    <div className="flex justify-between gap-4">
                      <div>
                        <p className="flex flex-row items-center">
                          {findUser?.findUserById?.me.name}
                          {findUser?.findUserById?.me.verified && (
                            <span>{icons.checkVeriFied}</span>
                          )}
                        </p>
                        <span className="text-sm text-slate-400/90">
                          @{findUser?.findUserById?.me.username}
                        </span>
                      </div>
                      <button>Follow</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <ul className="flex flex-row flex-wrap gap-3 transition-all 2xl">
            {data?.findPost.tags.map((tag: string, index: number) => (
              <li
                className="bg-secondaryLigth px-3 hover:bg-slate-700 text-slate-400"
                key={index}
              >
                {tag}
              </li>
            ))}
          </ul>
        </article>
      )}
    </>
  )
}

export default FindPost
