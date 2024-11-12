import { $getSelection, $isRangeSelection } from 'lexical';
import { $findMatchingParent } from "@lexical/utils";

import { $isCommentNode } from '../../nodes'
import { getSelectedNode } from '../Toolbar.utils';

export const getCommentUuid = (): string => {
  const selection = $getSelection()

  if ($isRangeSelection(selection)) {
    const node = getSelectedNode(selection)
    const linkParent = $findMatchingParent(node, $isCommentNode)

    if (linkParent !== null) {
      return linkParent.getComment().uuid
    }

    if ($isCommentNode(node)) {
      return node.getComment().uuid
    }

    return ''
  }

  return ''
}
