import { useRef, Suspense } from 'react'

import LazyImage from './LazyImage'

import type { FC } from 'react'
import type { LexicalEditor, NodeKey } from 'lexical'

export type ImageComponentProps = {
  altText: string
  caption: LexicalEditor
  height: number | 'inherit'
  maxWidth: number
  nodeKey: NodeKey
  resizable: boolean
  showCaption: boolean
  src: string
  width: number | 'inherit'
  captionsEnabled: boolean
}

const ImageComponent: FC<ImageComponentProps> = ({ src, altText, width, height, maxWidth }) => {
  const imageRef = useRef<HTMLImageElement | null>(null)

  return <Suspense fallback={null}>
    <LazyImage
      className=""
      src={src}
      altText={altText}
      imageRef={imageRef}
      width={width}
      height={height}
      maxWidth={maxWidth}
    />
  </Suspense>
}

export default ImageComponent
