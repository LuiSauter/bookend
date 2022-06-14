import { SyntheticEvent } from 'react'

const gallery = [
  'https://i.giphy.com/media/3og0IFrHkIglEOg8Ba/giphy.webp',
  'https://i.giphy.com/media/jTNG3RF6EwbkpD4LZx/giphy.webp',
  'https://i.giphy.com/media/V4NSR1NG2p0KeJJyr5/giphy.webp',
  'https://i.giphy.com/media/ko7twHhomhk8E/giphy.webp',
  'https://i.giphy.com/media/igsvLnrCpT6NQftbBd/giphy.webp',
]

const randomImage = gallery[Math.floor(Math.random() * gallery.length)]

export const useErrorImg = () => {
  const errorHandlerImg = ({ currentTarget }: SyntheticEvent<HTMLImageElement>) => {
    currentTarget.onerror = null
    currentTarget.src = randomImage
  }
  return { errorHandlerImg }
}