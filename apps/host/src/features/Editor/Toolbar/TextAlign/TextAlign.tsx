import { FORMAT_ELEMENT_COMMAND } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ActionIcon, Flex } from '@mantine/core';
import { IconAlignLeft, IconAlignRight, IconAlignCenter, IconAlignJustified } from '@tabler/icons-react';

import { TextAlignEnum } from './TextAlign.types'

import type { FC } from 'react'

const TextAlign: FC = () => {
  const [editor] = useLexicalComposerContext()

  const handleClick = (type: TextAlignEnum) => () => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, type);
  }

  return <Flex align={'center'} gap={'xs'}>
    <ActionIcon onClick={handleClick(TextAlignEnum.Left)} variant={'white'} size={'md'} color="gray">
      <IconAlignLeft />
    </ActionIcon>
    <ActionIcon onClick={handleClick(TextAlignEnum.Center)} variant={'white'} size={'md'} color="gray">
      <IconAlignCenter />
    </ActionIcon>
    <ActionIcon onClick={handleClick(TextAlignEnum.Right)} variant={'white'} size={'md'} color="gray">
      <IconAlignRight />
    </ActionIcon>
    <ActionIcon onClick={handleClick(TextAlignEnum.Justify)} variant={'white'} size={'md'} color="gray">
      <IconAlignJustified />
    </ActionIcon>
  </Flex>
}

export default TextAlign
