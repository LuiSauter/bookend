import { useMutation } from '@apollo/client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'
import { useForm } from 'react-hook-form'
import { arrowLeft } from 'src/assets/icons'
import { UPDATE_PROFILE } from 'src/users/graphql-mutations'
import { ALL_USERS } from 'src/users/graphql-queries'
interface Props {
  profileData: Profile | any;
  onClick?: () => void;
}

const ProfileForm = ({ profileData, onClick }: Props) => {
  const { data: session } = useSession()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      description: profileData.description ? profileData.description : '',
      email: session?.user?.email || '',
      gender: profileData.gender || 'other',
      name: profileData.me.name ? profileData.me.name : session?.user?.name,
      username: profileData.me.username ? profileData.me.username : '',
      website: profileData.website ? profileData.website : '',
      location: profileData.location ? profileData.location : '',
    },
  })
  const [getProfile] = useMutation(UPDATE_PROFILE, {
    refetchQueries: [{ query: ALL_USERS }],
  })
  const onSubmit = (data: any) => {
    const { description, email, gender, location, name, username, website } =
      data
    if (!(name && username && email)) return
    getProfile({
      variables: {
        name: name,
        username: username,
        profile: profileData.id,
        description: description,
        gender: gender,
        website: website,
        location: location,
      },
    })
    router.push('/')
  }

  return (
    <section className="m-auto sm:w-11/12 lg:w-full sm:min-w-minForm mb-4 bg-secondary rounded-xl">
      <header className="p-2 flex">
        <button
          className="mr-4 hover:bg-secondaryLigth rounded-full w-9 h-9 flex items-center justify-center"
          onClick={onClick}
        >
          {arrowLeft}
        </button>
        <h2 className="mb-1 text-lg font-semibold">Edit your profile</h2>
      </header>
      <hr className="border-secondaryLigth border-b-2 rounded-lg" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full sm:w-11/12 m-auto p-4 sm:p-0 sm:pb-4"
      >
        <div className="flex items-center justify-center m-auto w-full">
          <figure className="m-0 rounded-full overflow-hidden h-full mr-5">
            <img
              className="w-32 m-auto rounded-full"
              src={
                session?.user?.image
                  ? session?.user?.image
                  : '/default-user.webp'
              }
              alt={profileData?.me.name || 'bookend'}
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
                className="block w-full rounded-md py-1 px-2 mt-2 text-textWhite bg-secondaryLigth focus:outline-none focus:ring-4 focus:border-thirdBlue focus:ring-opacity-25"
                {...register('name', {
                  required: {
                    value: true,
                    message: 'Please write your name',
                  },
                })}
                type="text"
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
        <button className="bg-blue-500 text-lg font-semibold py-1 rounded-md mb-2 hover:bg-thirdBlue focus:outline-none focus:ring-4 focus:border-thirdBlue focus:ring-offset-gray-200">
          Save your profile
        </button>
      </form>
    </section>
  )
}

export default ProfileForm
