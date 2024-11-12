import { useCallback, useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { $getSelection, $isRangeSelection, SELECTION_CHANGE_COMMAND } from 'lexical';
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister, $findMatchingParent } from "@lexical/utils";
import { Flex, ActionIcon, Popover } from '@mantine/core';
import { IconMessage } from '@tabler/icons-react';

import { $isCommentNode } from '../../nodes';
import { SET_COMMENT_COMMAND } from '../../plugins';
import { getSelectedNode } from '../Toolbar.utils';
import { LowPriority } from '../Toolbar.constants';

import { getCommentUuid } from './Comment.utils';

import type { FC } from 'react';

const Comment: FC = () => {
  const [editor] = useLexicalComposerContext()
  const [isComment, setIsComment] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [uuid, setUuid] = useState<string>('')
  const isPopoverOpen = Boolean(anchorEl)

  const handleClick = () => {
    if (!isComment) {
      editor.dispatchCommand(SET_COMMENT_COMMAND, {
        uuid: nanoid()
      });
    }
  }

  const updateComment = useCallback(() => {
    const selection = $getSelection()

    if (selection && $isRangeSelection(selection)) {
      const node = getSelectedNode(selection)
      const parent = $findMatchingParent(node, $isCommentNode)
      const uuid = getCommentUuid()

      if (parent && uuid) {
        const domNode = editor.getElementByKey(parent.getKey())

        setAnchorEl(domNode)
        setUuid(uuid)
        setIsComment(true)
      } else {
        setAnchorEl(null)
        setUuid('')
        setIsComment(false)
      }
    }
  }, [editor])

  useEffect(() => {
    if (anchorEl && isPopoverOpen) {
      const rect = anchorEl.getBoundingClientRect();

      setPosition({
        top: rect.bottom + window.scrollY, // Смещение по вертикали, чтобы показать Popover под элементом
        left: rect.left + window.scrollX,  // Смещение по горизонтали относительно anchorEl
      });
    }
  }, [anchorEl, isPopoverOpen]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateComment();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateComment();

          return false;
        },
        LowPriority
      )
    );
  }, [editor, updateComment]);

  return <Flex align={'center'} gap={'xs'}>
    <ActionIcon onClick={handleClick} variant={isComment ? 'filled' : 'white'} size={'md'} color="gray">
      <IconMessage />
    </ActionIcon>
    <Popover
      opened={isPopoverOpen}
    >
      <Popover.Dropdown top={position.top} left={position.left}>
        Get comment with id {uuid}
      </Popover.Dropdown>
    </Popover>
  </Flex>
}

export default Comment
