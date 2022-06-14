import Image from 'next/image'
import React, { MouseEvent } from 'react'
import { useErrorImg } from 'src/hooks/useErrorImg'
import { usePlaceholder } from 'src/hooks/usePlaceholder'

type Props = {
  priority?: boolean
  styles: string
  nameAlt: string | undefined
  placeholder?: boolean
  photoURL: string | undefined,
  quality?: number
  onClick?: (event: MouseEvent<HTMLImageElement>) => void
}

const gallery = [
  'https://i.giphy.com/media/3og0IFrHkIglEOg8Ba/giphy.webp',
  'https://i.giphy.com/media/jTNG3RF6EwbkpD4LZx/giphy.webp',
  'https://i.giphy.com/media/V4NSR1NG2p0KeJJyr5/giphy.webp',
  'https://i.giphy.com/media/ko7twHhomhk8E/giphy.webp',
  'https://i.giphy.com/media/igsvLnrCpT6NQftbBd/giphy.webp',
]

const randomImage = gallery[Math.floor(Math.random() * gallery.length)]

const PhotoUser = ({
  nameAlt = 'Bookend',
  photoURL = randomImage, // image random
  styles = '',
  placeholder = true,
  priority = false,
  quality = 75,
  onClick,
}: Props) => {
  const { errorHandlerImg } = useErrorImg()
  const createBlurDataUrl = usePlaceholder()

  return (
    <Image
      onClick={onClick}
      layout='fill'
      priority={priority}
      className={styles}
      src={photoURL}
      alt={nameAlt}
      placeholder={placeholder ? 'blur' : 'empty'}
      blurDataURL={createBlurDataUrl({ w: 80, h: 80 })}
      onError={errorHandlerImg}
      quality={quality}
      objectFit='cover'
    />
  )
}

export default PhotoUser