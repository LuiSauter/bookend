import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

interface FormInp {
  title: string;
  description: string;
  img: string | any;
  book: string;
}

const initalState = {
  title: '',
  description: '',
  img: '',
  book: '',
}

const New = (): JSX.Element => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormInputs>()
  const [dataForm, setDataForm] = useState<FormInp>(initalState)
  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    const file = data.img[0]
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    return (fileReader.onload = (e) => {
      const imgSrc = e.target?.result
      return setDataForm({
        ...dataForm,
        title: data.title,
        description: data.description,
        img: imgSrc,
        book: data.book,
      })
    })
  }
  return (
    <>
      <section className="flex flex-col gap-4 w-full bg-secondary py-4 px-6 min-w-minForm sm:rounded-xl">
        <article className="w-full sm:w-11/12 m-auto sm:min-w-minForm">
          <header className="mb-4">
            <h2 className="mb-1 text-lg font-semibold">Create new book</h2>
            <hr />
          </header>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 w-full"
          >
            <label className="font-semibold">
              Title <span className="text-thirdBlue">* </span>
              {errors.title?.type === 'required' && (
                <span className="text-red-500 text-sm font-medium">
                  {errors.title.message}
                </span>
              )}
              <input
                className="block w-full rounded-md py-1 px-2 mt-1 text-textWhite bg-secondaryLigth focus:outline-none focus:ring-4 ring-offset-2 focus:border-thirdBlue focus:ring-opacity-25 focus:ring-offset-gray-200"
                {...register('title', {
                  required: {
                    value: true,
                    message: 'title is required',
                  },
                })}
                type="text"
                placeholder="Write a title"
              />
            </label>
            <label>
              Description <span className="text-thirdBlue">* </span>
              {errors.description?.type === 'required' && (
                <span className="text-red-500 text-sm font-medium">
                  {errors.description.message}
                </span>
              )}
              <input
                className="block w-full rounded-md py-1 px-2 mt-1 text-textWhite bg-secondaryLigth focus:outline-none focus:ring-4 ring-offset-2 focus:border-thirdBlue focus:ring-offset-gray-200"
                {...register('description', {
                  required: {
                    value: true,
                    message: 'Description is required',
                  },
                })}
                type="text"
                placeholder="Write a description"
              />
            </label>
            {errors.description?.type === 'required' && (
              <span>{errors.description.message}</span>
            )}
            <label>
              Add an image <span className="text-thirdBlue">* </span>
              {errors.img?.type === 'required' && (
                <span className="text-red-500 text-sm font-medium">
                  {errors.img.message}
                </span>
              )}
              <input
                className="flex p-1 rounded-md hover:bg-secondaryLigth transition-colors focus:outline-none focus:ring-4 ring-offset-2 focus:border-thirdBlue focus:ring-offset-gray-200"
                {...register('img', {
                  required: {
                    value: true,
                    message: 'This image is required',
                  },
                })}
                type="file"
                accept="image/*"
                placeholder="drive.google.com/example"
              />
            </label>
            {errors.img?.type === 'required' && (
              <span>{errors.img.message}</span>
            )}
            <label>
              Book in google drive <span className="text-thirdBlue">* </span>
              {errors.book?.type === 'required' && (
                <span className="text-red-500 text-sm font-medium">
                  {errors.book.message}
                </span>
              )}
              <input
                className="block w-full rounded-md py-1 px-2 mt-1 text-textWhite bg-secondaryLigth focus:outline-none focus:ring-4 ring-offset-2 focus:border-thirdBlue focus:ring-offset-gray-200"
                {...register('book', {
                  required: {
                    value: true,
                    message: 'This field is required to google drive',
                  },
                })}
                type="text"
                placeholder="drive.google.com/example"
              />
            </label>
            {errors.book?.type === 'required' && (
              <span>{errors.book.message}</span>
            )}
            <label className="text-textGray text-base">
              <span className="text-thirdBlue">*</span> fields required
            </label>
            <button className="bg-blue-500 py-1 rounded-md mb-2 hover:bg-thirdBlue focus:outline-none focus:ring-4 ring-offset-2 focus:border-thirdBlue focus:ring-offset-gray-200">
              submit
            </button>
          </form>
          {dataForm?.img && <img src={dataForm.img} />}
        </article>
      </section>
    </>
  )
}

export default New