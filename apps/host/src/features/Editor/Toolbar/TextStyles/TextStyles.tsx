import { useCallback, useEffect, useState } from 'react';
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { mergeRegister } from '@lexical/utils';
import { ActionIcon, Flex } from '@mantine/core';
import { IconBold, IconItalic, IconUnderline, IconStrikethrough, IconCode } from '@tabler/icons-react';

import { LowPriority } from '../Toolbar.constants';

import { TextStylesEnum } from './TextStyles.types';

import type { FC } from 'react';

const TextStyles: FC = () => {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState<boolean>(false);
  const [isItalic, setIsItalic] = useState<boolean>(false);
  const [isUnderline, setIsUnderline] = useState<boolean>(false);
  const [isStrikethrough, setIsStrikethrough] = useState<boolean>(false);
  const [isCode, setIsCode] = useState<boolean>(false);

  const handleClick = (type: TextStylesEnum) => () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, type);
  };

  const updateTextStyles = useCallback(() => {
    const selection = $getSelection();

    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat(TextStylesEnum.Bold));
      setIsItalic(selection.hasFormat(TextStylesEnum.Italic));
      setIsUnderline(selection.hasFormat(TextStylesEnum.Underline));
      setIsStrikethrough(selection.hasFormat(TextStylesEnum.Strikethrough));
      setIsCode(selection.hasFormat(TextStylesEnum.Code));
    }
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateTextStyles();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateTextStyles();

          return false;
        },
        LowPriority
      )
    );
  }, [editor, updateTextStyles]);

  return (
    <Flex align={'center'} gap={'xs'}>
      <ActionIcon onClick={handleClick(TextStylesEnum.Bold)} variant={isBold ? 'filled' : 'white'} size={'md'} color="gray">
        <IconBold />
      </ActionIcon>
      <ActionIcon onClick={handleClick(TextStylesEnum.Italic)} variant={isItalic ? 'filled' : 'white'} size={'md'} color="gray">
        <IconItalic />
      </ActionIcon>
      <ActionIcon onClick={handleClick(TextStylesEnum.Underline)} variant={isUnderline ? 'filled' : 'white'} size={'md'} color="gray">
        <IconUnderline />
      </ActionIcon>
      <ActionIcon onClick={handleClick(TextStylesEnum.Strikethrough)} variant={isStrikethrough ? 'filled' : 'white'} size={'md'} color="gray">
        <IconStrikethrough />
      </ActionIcon>
      <ActionIcon onClick={handleClick(TextStylesEnum.Code)} variant={isCode ? 'filled' : 'white'} size={'md'} color="gray">
        <IconCode />
      </ActionIcon>
    </Flex>
  );
};

export default TextStyles;
