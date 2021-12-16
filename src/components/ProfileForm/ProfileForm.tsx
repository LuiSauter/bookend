import { useLazyQuery, useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { LOGINQL } from 'src/login/graphql-mutations'
import { FIND_PROFILE } from 'src/users/graphql-queries'
interface Props {
  profileData: LoginProfile;
}

const ProfileForm = ({ profileData }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  // const [getProfile, result] = useLazyQuery(FIND_PROFILE)
  // const [user, setUser] = useState(null)
  // getProfile({variables: {}})
  // useEffect(() => {
  //   let cleanup = true
  //   if (cleanup) {
  //     if (result.data) setUser(result.data.findProfile)
  //   }
  //   return () => {
  //     cleanup = false
  //   }
  // }, [])
  const onSubmit = (data: any) => {
    const { description, email, gender, location, name, username, website } =
      data
    if (!(name && username && email)) return
    // login({
    //   variables: {
    //     description,
    //     email,
    //     gender,
    //     location,
    //     name,
    //     username,
    //     website,
    //   },
    // })
    console.log(data)
  }
  return (
    <section className="m-auto sm:w-11/12 lg:w-full sm:min-w-minForm mb-4 bg-secondary rounded-xl">
      <header className="mb-4 p-4 pb-0">
        <h2 className="mb-1 text-lg font-semibold">Edit your profile</h2>
        <hr className="border-secondaryLigth border-b-2 rounded-lg" />
      </header>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full sm:w-11/12 m-auto p-4 sm:p-0 sm:pb-4"
      >
        <div className="flex items-center justify-center m-auto w-full">
          <figure className="m-0 rounded-full overflow-hidden h-full mr-5">
            <img
              className="w-32 m-auto rounded-full"
              src="/default-user.webp"
              alt=""
            />
          </figure>
          <div className="flex flex-col">
            <label className="font-semibold w-full">
              Name <span className="text-thirdBlue">* </span>
              {errors.name?.type === 'required' && (
                <span className="text-red-500 text-sm font-medium">
                  {errors.name.message}
                </span>
              )}
              <input
                className="block w-full rounded-md py-1 px-2 mt-2 text-textWhite bg-secondaryLigth focus:outline-none focus:ring-4 focus:border-thirdBlue focus:ring-opacity-25 "
                {...register('name', {
                  required: {
                    value: true,
                    message: 'Please write your name',
                  },
                })}
                type="text"
                value={profileData.name}
                placeholder="Write your name"
              />
            </label>
            <label className="font-semibold w-full mt-4">
              Username <span className="text-thirdBlue">* </span>
              {errors.username?.type === 'required' && (
                <span className="text-red-500 text-sm font-medium">
                  {errors.username.message}
                </span>
              )}
              <input
                className="block w-full rounded-md py-1 px-2 mt-2 text-textWhite bg-secondaryLigth focus:outline-none focus:ring-4 focus:border-thirdBlue focus:ring-opacity-25 "
                {...register('username', {
                  required: {
                    value: true,
                    message: 'Please write the username',
                  },
                })}
                type="text"
                placeholder="Write a username"
              />
            </label>
          </div>
        </div>
        <label className="font-semibold">
          Email <span className="text-thirdBlue">* </span>
          {errors.email?.type === 'required' && (
            <span className="text-red-500 text-sm font-medium">
              {errors.email.message}
            </span>
          )}
          <input
            className="block w-full rounded-md py-1 px-2 mt-2 text-textWhite bg-secondaryLigth focus:outline-none focus:ring-4 focus:border-thirdBlue focus:ring-opacity-25 opacity-50"
            {...register('email', {
              required: {
                value: true,
                message: 'This field is required',
              },
            })}
            value={profileData.email}
            disabled={true}
            type="text"
            placeholder="Write a email"
          />
        </label>
        <label className="font-semibold">
          Description <span className="text-thirdBlue">* </span>
          {errors.description?.type === 'required' && (
            <span className="text-red-500 text-sm font-medium">
              {errors.description.message}
            </span>
          )}
          <input
            className="block w-full rounded-md py-1 px-2 mt-2 text-textWhite bg-secondaryLigth focus:outline-none focus:ring-4 focus:border-thirdBlue focus:ring-opacity-25 "
            {...register('description', {
              required: {
                value: true,
                message: 'This field is required',
              },
            })}
            type="text"
            placeholder="Write a description"
          />
        </label>
        <label className="font-semibold">
          Gender
          <select
            {...register('gender')}
            className="text-black rounded-md ml-4 focus:outline-none focus:ring-4 focus:border-thirdBlue focus:ring-opacity-25"
          >
            <option value="female">female</option>
            <option value="male">male</option>
            <option value="other">other</option>
          </select>
        </label>
        <div className="flex flex-row w-full">
          <label className="font-semibold mr-4 w-full">
            Website
            <input
              className="block w-full rounded-md py-1 px-2 mt-2 text-textWhite bg-secondaryLigth focus:outline-none focus:ring-4 focus:border-thirdBlue focus:ring-opacity-25 "
              {...register('website')}
              type="text"
              placeholder="example.com"
            />
          </label>
          <label className="font-semibold w-full">
            Location
            <input
              className="block w-full rounded-md py-1 px-2 mt-2 text-textWhite bg-secondaryLigth focus:outline-none focus:ring-4 focus:border-thirdBlue focus:ring-opacity-25 "
              {...register('location')}
              type="text"
              placeholder="Tokio, Japam"
            />
          </label>
        </div>
        <label className="text-textGray text-base">
          <span className="text-thirdBlue">*</span> fields required
        </label>
        <button className="bg-blue-500 text-lg font-semibold py-1 rounded-md mb-2 hover:bg-thirdBlue focus:outline-none focus:ring-4 focus:border-thirdBlue focus:ring-offset-gray-200">
          Save your profile
        </button>
      </form>
    </section>
  )
}

export default ProfileForm
