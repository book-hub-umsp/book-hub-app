import type { LexicalEditor, NodeKey } from 'lexical'

export type ImagePayload = {
  altText: string
  caption?: LexicalEditor
  height?: number
  key?: NodeKey
  maxWidth?: number
  showCaption?: boolean
  src: string
  width?: number
  captionsEnabled?: boolean
}

export type InsertImagePayload = Readonly<ImagePayload>
