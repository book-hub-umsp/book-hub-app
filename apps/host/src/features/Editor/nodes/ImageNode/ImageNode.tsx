import { Suspense } from 'react'
import { createEditor, DecoratorNode } from 'lexical'

import ImageComponent from './ImageComponent'

import { $createImageNode, convertImageElement } from './ImageNode.utils'

import type { SerializedEditor, SerializedLexicalNode, Spread, DOMConversionMap, DOMExportOutput, EditorConfig, LexicalEditor, NodeKey } from 'lexical'

export type SerializedImageNode = Spread<
  {
    altText: string
    caption: SerializedEditor
    height?: number
    maxWidth: number
    showCaption: boolean
    src: string
    width?: number
    type: 'image'
    version: 1
  },
  SerializedLexicalNode
>

export class ImageNode extends DecoratorNode<JSX.Element> {
  __src: string
  __altText: string
  __width: number | 'inherit'
  __height: number | 'inherit'
  __maxWidth: number
  __showCaption: boolean
  __caption: LexicalEditor
  __captionsEnabled: boolean

  static getType(): string {
    return 'image'
  }

  static clone(node: ImageNode): ImageNode {
    return new ImageNode(
      node.__src,
      node.__altText,
      node.__maxWidth,
      Number(node.__width),
      node.__height,
      node.__showCaption,
      node.__caption,
      node.__captionsEnabled,
      node.__key,
    )
  }

  static importJSON(serializedNode: SerializedImageNode): ImageNode {
    const { altText, height, width, maxWidth, caption, src, showCaption } =
      serializedNode
    const node = $createImageNode({
      altText,
      height,
      maxWidth,
      showCaption,
      src,
      width,
    })
    const nestedEditor = node.__caption
    const editorState = nestedEditor.parseEditorState(caption.editorState)

    if (!editorState.isEmpty()) {
      nestedEditor.setEditorState(editorState)
    }

    return node
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement('img')

    element.setAttribute('src', this.__src)
    element.setAttribute('alt', this.__altText)

    return { element }
  }

  static importDOM(): DOMConversionMap | null {
    return {
      img: () => ({
        conversion: convertImageElement,
        priority: 0,
      }),
    }
  }

  constructor(
    src: string,
    altText: string,
    maxWidth: number,
    width?: number | 'inherit',
    height?: number | 'inherit',
    showCaption?: boolean,
    caption?: LexicalEditor,
    captionsEnabled?: boolean,
    key?: NodeKey,
  ) {
    super(key)

    this.__src = src
    this.__altText = altText
    this.__maxWidth = maxWidth
    this.__width = width || 'inherit'
    this.__height = height || 'inherit'
    this.__showCaption = showCaption || false
    this.__caption = caption || createEditor()
    this.__captionsEnabled = captionsEnabled || captionsEnabled === undefined
  }

  exportJSON(): SerializedImageNode {
    return {
      altText: this.getAltText(),
      caption: this.__caption.toJSON(),
      height: this.__height === 'inherit' ? 0 : this.__height,
      maxWidth: this.__maxWidth,
      showCaption: this.__showCaption,
      src: this.getSrc(),
      type: 'image',
      version: 1,
      width: this.__width === 'inherit' ? 0 : this.__width,
    }
  }

  setWidthAndHeight(
    width: number | 'inherit',
    height: number | 'inherit',
  ): void {
    const writable = this.getWritable()

    writable.__width = width
    writable.__height = height
  }

  setShowCaption(showCaption: boolean): void {
    const writable = this.getWritable()

    writable.__showCaption = showCaption
  }

  // View

  createDOM(config: EditorConfig): HTMLElement {
    const span = document.createElement('span')
    const { theme } = config
    const className = theme.image

    if (className !== undefined) {
      span.className = className
    }

    return span
  }

  updateDOM(): false {
    return false
  }

  getSrc(): string {
    return this.__src
  }

  getAltText(): string {
    return this.__altText
  }

  decorate(): JSX.Element {
    return (
      <Suspense fallback={null}>
        <ImageComponent
          src={this.__src}
          altText={this.__altText}
          width={this.__width}
          height={this.__height}
          maxWidth={this.__maxWidth}
          nodeKey={this.getKey()}
          showCaption={this.__showCaption}
          caption={this.__caption}
          captionsEnabled={this.__captionsEnabled}
          resizable={true}
        />
      </Suspense>
    )
  }
}
