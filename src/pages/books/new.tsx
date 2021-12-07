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
      <section className="flex flex-col gap-4">
        <header>Create new book</header>
        <article>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <label>
              Title *
              <input
                className="block"
                {...register('title', {
                  required: {
                    value: true,
                    message: 'Title is required',
                  },
                })}
                type="text"
                placeholder="Write a title"
              />
            </label>
            {errors.title?.type === 'required' && (
              <span>{errors.title.message}</span>
            )}
            <label>
              Description *
              <input
                className="block"
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
              Add an image *
              <input
                className="block"
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
              Book in google drive *
              <input
                className="block"
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
            <label>* fields required</label>
            <button>submit</button>
          </form>
          {dataForm?.img && <img src={dataForm.img} />}
        </article>
      </section>
    </>
  )
}

export default New