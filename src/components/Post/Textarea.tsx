import React from 'react'
import { Controller, Control } from 'react-hook-form'
import { useTranslate } from 'src/hooks/useTranslate'
import TextareaAutosize from 'react-textarea-autosize'

type Props = {
  control: Control | any
}

const Textarea = ({ control }: Props) => {
  const translate = useTranslate()
  return (
    <Controller
      control={control}
      name='postValues.description'
      rules={{ required: { value: true, message: 'This is required' } }}
      render={({ field: { onChange, value } }) => (
        <TextareaAutosize
          className='w-full h-auto resize-none block rounded-md py-1 px-2 mt-2 dark:text-textWhite dark:bg-secondaryLigth bg-sky-200/80 focus:outline-none focus:ring-4 focus:border-thirdBlue focus:ring-opacity-25 flex-wrap'
          placeholder={
            translate.post.Description === 'Descripción'
              ? `Escriba un ${translate.post.Description}`
              : `Write a ${translate.post.Description}`
          }
          onChange={(e) => onChange(e.target.value)}
          value={value}
        />
      )}
    />
  )
}

export default Textarea
