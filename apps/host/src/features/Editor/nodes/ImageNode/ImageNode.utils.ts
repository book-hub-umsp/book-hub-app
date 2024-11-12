import { ImageNode } from './ImageNode'

import type { DOMConversionOutput, LexicalNode } from 'lexical'
import type { ImagePayload } from './ImageNode.types'

export const $isImageNode = (
  node: LexicalNode | null | undefined,
): node is ImageNode => node instanceof ImageNode

export const $createImageNode = ({ altText, height, maxWidth = 500, captionsEnabled, src, width, showCaption, caption, key }: ImagePayload): ImageNode =>
  new ImageNode(
    src,
    altText,
    maxWidth,
    width,
    height,
    showCaption,
    caption,
    captionsEnabled,
    key,
  )

export const convertImageElement = (
  domNode: Node,
): DOMConversionOutput | null => {
  if (domNode instanceof HTMLImageElement) {
    const { alt: altText, src } = domNode
    const node = $createImageNode({ altText, src })

    return { node }
  }

  return null
}
