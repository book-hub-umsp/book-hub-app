import { $getSelection, $isRangeSelection, LexicalEditor } from 'lexical';
import { $createParagraphNode } from 'lexical';
import { $wrapNodes } from "@lexical/selection";
import { $createHeadingNode, $createQuoteNode } from '@lexical/rich-text';
import { $createCodeNode } from '@lexical/code';
import { INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND, REMOVE_LIST_COMMAND } from '@lexical/list';

import { ElementNode } from 'lexical';
import { BlockTypesEnum } from './BlockTypes.types';

const blockFormatters: Record<
  BlockTypesEnum,
  (editor: LexicalEditor, currentBlock: BlockTypesEnum) => ElementNode | void
> = {
  [BlockTypesEnum.Paragraph]: () => $createParagraphNode(),
  [BlockTypesEnum.Quote]: () => $createQuoteNode(),
  [BlockTypesEnum.Code]: () => $createCodeNode(),
  [BlockTypesEnum.H1]: () => $createHeadingNode('h1'),
  [BlockTypesEnum.H2]: () => $createHeadingNode('h2'),
  [BlockTypesEnum.UL]: (editor, currentBlock) => {
    if (currentBlock !== BlockTypesEnum.UL) {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  },
  [BlockTypesEnum.OL]: (editor, currentBlock) => {
    if (currentBlock !== BlockTypesEnum.OL) {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  },
};

export const formatNode = (editor: LexicalEditor, type: BlockTypesEnum, currentType: BlockTypesEnum) => {
  switch (type) {
    case BlockTypesEnum.Paragraph: case BlockTypesEnum.Quote: case BlockTypesEnum.Code: case BlockTypesEnum.H1: case BlockTypesEnum.H2: {
      if (currentType !== type) {
        editor.update(() => {
          const selection = $getSelection();

          if ($isRangeSelection(selection)) {
            $wrapNodes(selection, () => blockFormatters[type](editor, currentType) as ElementNode);
          }
        });
      }

      break
    }
    case BlockTypesEnum.UL: case BlockTypesEnum.OL: {
      blockFormatters[type](editor, currentType)

      break
    }
    default: {
      return
    }
  }
}
