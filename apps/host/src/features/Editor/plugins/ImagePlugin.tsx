import { useEffect } from 'react'
import {
  $createParagraphNode,
  $insertNodes,
  $isRootOrShadowRoot,
  COMMAND_PRIORITY_EDITOR,
  createCommand
} from 'lexical'
import { $wrapNodeInElement, mergeRegister } from '@lexical/utils'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'

import { $createImageNode, ImageNode } from '../nodes'

import type { FC } from 'react'
import type { LexicalCommand } from 'lexical'
import type { InsertImagePayload } from '../nodes'

export const INSERT_IMAGE_COMMAND: LexicalCommand<InsertImagePayload> =
  createCommand('INSERT_IMAGE_COMMAND')

export type ImagesPluginProps = {
  captionsEnabled?: boolean
}

const ImagesPlugin: FC<ImagesPluginProps> = ({ captionsEnabled }) => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    if (!editor.hasNodes([ImageNode])) {
      throw new Error('ImagesPlugin: ImageNode not registered on editor')
    }

    return mergeRegister(
      editor.registerCommand<InsertImagePayload>(
        INSERT_IMAGE_COMMAND,
        (payload) => {
          const imageNode = $createImageNode(payload)

          $insertNodes([imageNode])

          if ($isRootOrShadowRoot(imageNode.getParentOrThrow())) {
            $wrapNodeInElement(imageNode, $createParagraphNode).selectEnd()
          }

          return true
        },
        COMMAND_PRIORITY_EDITOR,
      ),
    )
  }, [captionsEnabled, editor])

  return null
}

export default ImagesPlugin
