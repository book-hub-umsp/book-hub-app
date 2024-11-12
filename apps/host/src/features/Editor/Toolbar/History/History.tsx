import { useEffect, useState } from 'react'
import { CAN_REDO_COMMAND, CAN_UNDO_COMMAND, REDO_COMMAND, UNDO_COMMAND } from 'lexical';
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import { Flex, ActionIcon } from '@mantine/core';
import { IconArrowBackUp, IconArrowForwardUp } from '@tabler/icons-react';

import { LowPriority } from '../Toolbar.constants'

import type { FC } from 'react'

const History: FC = () => {
  const [editor] = useLexicalComposerContext()
  const [isCanUndo, setIsCanUndo] = useState<boolean>(false)
  const [isCanRedo, setIsCanRedo] = useState<boolean>(false)

  const handleUndo = () => {
    editor.dispatchCommand(UNDO_COMMAND, undefined);
  }

  const handleRedo= () => {
    editor.dispatchCommand(REDO_COMMAND, undefined);
  }

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setIsCanUndo(payload);

          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setIsCanRedo(payload);

          return false;
        },
        LowPriority
      )
    )
  }, []);

  return <Flex align={'center'} gap={'xs'}>
    <ActionIcon onClick={handleUndo} variant={'white'} size={'md'} disabled={!isCanUndo}>
      <IconArrowBackUp />
    </ActionIcon>
    <ActionIcon onClick={handleRedo} variant={'white'} size={'md'} disabled={!isCanRedo}>
      <IconArrowForwardUp />
    </ActionIcon>
  </Flex>
}

export default History
