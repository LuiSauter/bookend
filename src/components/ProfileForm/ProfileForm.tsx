import { useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { CREATE_PROFILE } from 'src/users/graphql-mutations'
import { FIND_USER } from 'src/users/graphql-queries'
interface Props {
  profileData: LoginProfile;
  image: string | null | undefined;
}

const ProfileForm = ({ profileData, image }: Props) => {
  const { name, email } = profileData
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      description: '',
      email: email,
      gender: 'male',
      location: '',
      name: name,
      username: '',
      website: '',
    },
  })
  const [getProfile, { data, loading, error }] = useMutation(CREATE_PROFILE)
  const onSubmit = (data: any) => {
    const { description, email, gender, location, name, username, website } =
      data
    if (!(name && username && email)) return
    getProfile({
      variables: {
        username: username,
        profile: profileData.profile,
        description: description,
        gender: gender,
        website: website,
        location: location,
      },
    })
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
              src={image ? image : '/default-user.webp'}
              alt={profileData.name}
            />
          </figure>
          <div className="flex flex-col">
            <label className="font-semibold w-full">
              Name <span className="text-thirdBlue">* </span>
              <input
                className="block w-full rounded-md py-1 px-2 mt-2 text-textWhite bg-secondaryLigth focus:outline-none focus:ring-4 focus:border-thirdBlue focus:ring-opacity-25 opacity-50 cursor-default"
                {...register('name', {
                  required: {
                    value: true,
                    message: 'Please write your name',
                  },
                })}
                type="text"
                disabled={true}
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
          <input
            className="block w-full rounded-md py-1 px-2 mt-2 text-textWhite bg-secondaryLigth focus:outline-none focus:ring-4 focus:border-thirdBlue focus:ring-opacity-25 opacity-50"
            {...register('email', {
              required: {
                value: true,
                message: 'This field is required',
              },
            })}
            // value={profileData.email}
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
              placeholder="Tokio, Japón"
            />
          </label>
        </div>
        <label className="text-textGray text-base">
          <span className="text-thirdBlue">*</span> fields required
        </label>
        {console.log(errors)}
        <button className="bg-blue-500 text-lg font-semibold py-1 rounded-md mb-2 hover:bg-thirdBlue focus:outline-none focus:ring-4 focus:border-thirdBlue focus:ring-offset-gray-200">
          Save your profile
        </button>
      </form>
    </section>
  )
}

export default ProfileForm
