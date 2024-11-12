import { $getSelection, $isRangeSelection } from 'lexical';
import { $findMatchingParent } from "@lexical/utils";
import { $isLinkNode } from "@lexical/link";

import { getSelectedNode } from '../Toolbar.utils'

import type { LexicalEditor } from 'lexical';

export const getLinkUrl = (): string => {
  const selection = $getSelection()

  if ($isRangeSelection(selection)) {
    const node = getSelectedNode(selection)
    const linkParent = $findMatchingParent(node, $isLinkNode)

    if (linkParent !== null) {
      return linkParent.getURL()
    }

    if ($isLinkNode(node)) {
      return node.getURL()
    }

    return ''
  }

  return ''
}

export const getLinkLastSelection = (editor: LexicalEditor) => {
  const selection = $getSelection()
  const nativeSelection = window.getSelection()
  const { activeElement } = document
  const rootElement = editor.getRootElement()
  const isElementsExist =
    selection !== null && nativeSelection !== null && rootElement !== null
  const hasLastSelection =
    isElementsExist && rootElement.contains(nativeSelection.anchorNode)
  const hasSelection = hasLastSelection && editor.isEditable()

  if (hasSelection) {
    return selection
  }

  if (!activeElement) {
    return null
  }

  return null
}
