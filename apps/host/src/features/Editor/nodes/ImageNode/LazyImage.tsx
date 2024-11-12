import { useSuspenseImage } from './ImageNode.hooks'

import type { FC, MouseEvent, RefObject } from 'react'

export type LazyImageProps = {
  altText: string
  className: string | null
  height: number | 'inherit'
  imageRef: RefObject<HTMLImageElement>
  maxWidth: number
  src: string
  width: number | 'inherit'
}

const LazyImage: FC<LazyImageProps> = ({ altText, className, imageRef, src, width, height, maxWidth }) => {
  useSuspenseImage(src)

  return (
    <img
      className={className || undefined}
      src={src}
      alt={altText}
      ref={imageRef}
      style={{
        height,
        maxWidth,
        width,
      }}
    />
  )
}

export default LazyImage
