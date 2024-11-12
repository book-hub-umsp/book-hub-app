import { useEffect } from 'react'
import {
  $isElementNode,
  createCommand,
  $getSelection,
  $setSelection,
  COMMAND_PRIORITY_EDITOR
} from 'lexical'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { mergeRegister } from '@lexical/utils'

import { $isCommentNode, CommentNode, $createCommentNode } from '../nodes'

import type { FC } from 'react'
import type { ElementNode, LexicalCommand } from 'lexical'
import type { CommentPayload } from '../nodes'

export const UPDATE_COMMENT_COMMAND: LexicalCommand<CommentPayload | null> = createCommand();

export const SET_COMMENT_COMMAND: LexicalCommand<CommentPayload | null> = createCommand();

const setCommentInstance = (commentInstance: CommentPayload | null) => {
  const selection = $getSelection();

  if (selection !== null) $setSelection(selection)

  const sel = $getSelection();

  if (sel !== null) {
    const nodes = sel.extract();

    if (commentInstance === null) {
      nodes.forEach((node) => {
        const parent = node.getParent();

        if (parent && $isCommentNode(parent)) {
          const children = parent.getChildren();

          for (let i = 0; i < children.length; i += 1) parent.insertBefore(children[i])

          parent.remove();
        }
      });
    } else {
      if (nodes.length === 1) {
        const firstNode = nodes[0];

        if ($isCommentNode(firstNode)) {
          (firstNode as CommentNode).setComment(commentInstance);

          return;
        }

        const parent = firstNode.getParent();

        if (parent && $isCommentNode(parent)) {
          (parent as CommentNode).setComment(commentInstance);
          return;
        }
      }

      let prevParent: any = null;
      let commentNode: any = null;

      nodes.forEach((node) => {
        const parent = node.getParent();

        if (
          parent === commentNode ||
          parent === null ||
          ($isElementNode(node) && !(node as ElementNode).isInline())
        ) {
          return;
        }

        if (!parent.is(prevParent)) {
          prevParent = parent;
          commentNode = $createCommentNode(commentInstance);

          if ($isCommentNode(parent)) {
            if (node.getPreviousSibling() === null) {
              parent.insertBefore(commentNode);
            } else {
              parent.insertAfter(commentNode);
            }
          } else {
            node.insertBefore(commentNode);
          }
        }

        if ($isCommentNode(node)) {
          if (commentNode !== null) {
            const children = (node as CommentNode).getChildren();

            for (let i = 0; i < children.length; i++) commentNode.append(children[i])
          }

          node.remove();

          return;
        }

        if (commentNode !== null) {
          commentNode.append(node);
        }
      });
    }
  }
}

const updateCommentInstance = (commentInstance: CommentPayload | null) => {
  if (!commentInstance) return

  const selection = $getSelection();

  if (selection !== null) $setSelection(selection)

  const sel = $getSelection()

  if (sel !== null) {
    const nodes = sel.extract()

    for (const node of nodes) {
      const parent = node.getParent()
      let commentNode: CommentNode | undefined = undefined;

      if (parent && $isCommentNode(parent)) commentNode = parent as CommentNode
      else if (node && $isCommentNode(node)) commentNode = node as CommentNode

      const foundNodeWithSameUuid = commentNode?.__commentInstance.uuid === commentInstance.uuid || false

      if (foundNodeWithSameUuid) commentNode?.setComment(commentInstance)
    }
  }
}


const CommentPlugin: FC = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([CommentNode])) {
      throw new Error('CommentPlugin: CommentNode not registered on editor');
    }

    return mergeRegister(
      editor.registerCommand(
        SET_COMMENT_COMMAND,
        (payload: CommentPayload) => {
          setCommentInstance(payload);
          return true;
        },
        COMMAND_PRIORITY_EDITOR,
      ),
      editor.registerCommand(
        UPDATE_COMMENT_COMMAND,
        (payload: CommentPayload) => {
          updateCommentInstance(payload);
          return true;
        },
        COMMAND_PRIORITY_EDITOR,
      ),
    )
  }, [editor]);

  return null;
}

export default CommentPlugin;
