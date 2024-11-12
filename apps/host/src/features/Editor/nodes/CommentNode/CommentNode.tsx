import { $isElementNode, ElementNode } from 'lexical'
import { addClassNamesToElement } from '@lexical/utils'

import { convertCommentSpan, $createCommentNode } from './CommentNode.utils'

import type { NodeKey, EditorConfig, DOMConversionMap, RangeSelection } from 'lexical'
import type { CommentPayload } from './CommentNode.types'

export class CommentNode extends ElementNode {
  __commentInstance: CommentPayload;

  static getType(): string {
    return 'comment';
  }

  static clone(node: CommentNode): CommentNode {
    return new CommentNode(node.__commentInstance, node.__key);
  }

  constructor(commentInstance: CommentPayload, key?: NodeKey) {
    super(key);

    this.__commentInstance = commentInstance;
  }

  createDOM<EditorContext>(config: EditorConfig): HTMLElement {
    const element = document.createElement('span');

    element.setAttribute('data-comment-uuid', JSON.stringify(this.__commentInstance.uuid))
    element.setAttribute('class', 'editor-comment')
    addClassNamesToElement(element, config.theme.comment as string);

    return element;
  }

  updateDOM<EditorContext>(prevNode: CommentNode, dom: HTMLElement, config: EditorConfig): boolean {
    const commentSpan: HTMLSpanElement = dom;
    const [prevInstance, currentInstance] = [JSON.stringify(prevNode.__commentInstance.uuid), JSON.stringify(this.__commentInstance.uuid)]

    if (prevInstance !== currentInstance) commentSpan.setAttribute('data-comment-uuid', currentInstance)

    return false;
  }

  static importDOM(): DOMConversionMap | null {
    return {
      span: (node: Node) => ({
        conversion: convertCommentSpan,
        priority: 1,
      }),
    };
  }

  getComment(): CommentPayload {
    const self = this.getLatest();

    return (self as CommentNode).__commentInstance
  }

  setComment(commentInstance: CommentPayload): void {
    const writable = this.getWritable();

    (writable as CommentNode).__commentInstance = commentInstance;
  }

  insertNewAfter(selection: RangeSelection): null | ElementNode {
    const element = this.getParentOrThrow().insertNewAfter(selection);

    if ($isElementNode(element)) {
      const commentNode = $createCommentNode(this.__commentInstance);

      (element as ElementNode)?.append(commentNode);

      return commentNode;
    }

    return null;
  }

  canInsertTextBefore(): false {
    return false;
  }

  canInsertTextAfter(): boolean {
    return false;
  }

  canBeEmpty(): false {
    return false;
  }

  isInline(): true {
    return true;
  }
}
