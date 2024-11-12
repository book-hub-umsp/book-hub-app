import type { FC } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  $getNodeByKey,
  $getSelection,
  $isRangeSelection,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getNearestNodeOfType, mergeRegister } from '@lexical/utils';
import { $isListNode, ListNode } from '@lexical/list';
import { $isHeadingNode } from '@lexical/rich-text';
import {
  $isCodeNode,
  getCodeLanguages,
  getDefaultCodeLanguage,
} from '@lexical/code';
import { Flex, Select } from '@mantine/core';

import { LowPriority } from '../Toolbar.constants';

import { formatNode } from './BlockTypes.utils';
import { icons, selectOptions } from './BlockTypes.constants';
import { BlockTypesEnum } from './BlockTypes.types';

const BlockTypes: FC = () => {
  const [editor] = useLexicalComposerContext();
  const [selectedElementKey, setSelectedElementKey] = useState<string | null>(
    null
  );
  const [currentBlockType, setCurrentBlockType] = useState<BlockTypesEnum>(
    BlockTypesEnum.Paragraph
  );
  const [codeLanguage, setCodeLanguage] = useState<string>('');
  const codeLanguages = useMemo(() => getCodeLanguages(), []);

  const handleChange = (value: string | null) => {
    if (!value) return;

    const typedValue = value as BlockTypesEnum;

    formatNode(editor, typedValue, currentBlockType);
    setCurrentBlockType(typedValue);
  };

  const handleCodeChange = (value: string | null) => {
    if (!value) return;

    editor.update(() => {
      if (selectedElementKey !== null) {
        const node = $getNodeByKey(selectedElementKey);
        if ($isCodeNode(node)) {
          node.setLanguage(value);
        }
      }
    });
  };

  const updateBlockTypes = useCallback(() => {
    const selection = $getSelection();

    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === 'root'
          ? anchorNode
          : anchorNode.getTopLevelElementOrThrow();
      const elementKey = element.getKey();
      const elementDOM = editor.getElementByKey(elementKey);

      if (elementDOM !== null) {
        setSelectedElementKey(elementKey);

        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode);
          const type = (
            parentList ? parentList.getTag() : element.getTag()
          ) as BlockTypesEnum;

          setCurrentBlockType(type);
        } else {
          const type = (
            $isHeadingNode(element) ? element.getTag() : element.getType()
          ) as BlockTypesEnum;

          setCurrentBlockType(type);

          if ($isCodeNode(element)) {
            setCodeLanguage(element.getLanguage() || getDefaultCodeLanguage());
          }
        }
      }
    }
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateBlockTypes();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateBlockTypes();

          return false;
        },
        LowPriority
      )
    );
  }, [editor, updateBlockTypes]);

  return (
    <Flex align={'center'} gap={'xs'}>
      <Select
        data={selectOptions}
        value={currentBlockType}
        onChange={handleChange}
        renderOption={(item) => (
          <Flex align={'center'} gap={'xs'}>
            {icons[item.option.value as BlockTypesEnum]}
            {item.option.label}
          </Flex>
        )}
        variant={'unstyled'}
        leftSection={icons[currentBlockType]}
      />
      {currentBlockType === BlockTypesEnum.Code && <Select data={codeLanguages} value={codeLanguage} onChange={handleCodeChange} variant={'unstyled'} />}
    </Flex>
  );
};

export default BlockTypes;
