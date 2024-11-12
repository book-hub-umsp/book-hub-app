import { CommentNode } from './CommentNode'

import type { DOMConversionOutput, LexicalNode } from 'lexical';
import type { CommentPayload } from './CommentNode.types';

export const convertCommentSpan = (domNode: Node): DOMConversionOutput => {
  let node = null;

  if (domNode instanceof HTMLSpanElement) {
    const commentInstance = domNode.getAttribute('data-comment-uuid')

    if (commentInstance) {
      const jsonCommentInstance = JSON.parse(commentInstance as string)

      node = $createCommentNode(jsonCommentInstance);
    }
  }

  return { node };
}

export const $createCommentNode = (commentInstance: CommentPayload): CommentNode => new CommentNode(commentInstance);

export const $isCommentNode = (node: LexicalNode | null | undefined): node is CommentNode => node instanceof CommentNode;
