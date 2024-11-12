import { useCallback, useEffect, useRef, useState } from 'react';
import { $getSelection, $isRangeSelection, SELECTION_CHANGE_COMMAND } from 'lexical';
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister, $findMatchingParent } from "@lexical/utils";
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import { Flex, ActionIcon, Popover, Input } from '@mantine/core';
import { IconLink, IconEdit } from "@tabler/icons-react";

import { getSelectedNode } from '../Toolbar.utils';
import { LowPriority } from '../Toolbar.constants';

import { getLinkUrl, getLinkLastSelection } from './Link.utils';

import type { FC, KeyboardEvent, ChangeEvent } from 'react';
import type { BaseSelection } from 'lexical';

const Link: FC = () => {
  const [editor] = useLexicalComposerContext()
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLink, setIsLink] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [url, setUrl] = useState<string>("");
  const [isEditMode, setEditMode] = useState<boolean>(false);
  const [lastSelection, setLastSelection] = useState<BaseSelection | null>(null);
  const isPopoverOpen = Boolean(anchorEl)

  const handleClick = useCallback(() => {
    if (!isLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, "https://");
      setEditMode(true)
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  }, [editor, isLink]);

  const handleToggleEditMode = () => setEditMode(!isEditMode)

  const handleDeleteLink = () => {
    editor.dispatchCommand(TOGGLE_LINK_COMMAND, url);
    setEditMode(false);
  }

  const handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setUrl(value)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()

      if (lastSelection !== null) {
        if (url !== "") {
          handleDeleteLink()
        }

        setEditMode(false);
      }

      return
    }

    if (event.key === "Escape") {
      event.preventDefault();

      setEditMode(false);
    }
  }

  const updateLink = useCallback(() => {
    const selection = $getSelection()

    if (selection && $isRangeSelection(selection)) {
      const node = getSelectedNode(selection)
      const parent = $findMatchingParent(node, $isLinkNode)
      const url = getLinkUrl()

      if (parent && url) {
        const domNode = editor.getElementByKey(parent.getKey())
        const newLastSelection = getLinkLastSelection(editor)

        if (newLastSelection !== null) {
          setAnchorEl(domNode)
          setUrl(url)
          setLastSelection(newLastSelection)
          setIsLink(true)
        }
      } else {
        setAnchorEl(null)
        setLastSelection(null)
        setUrl('')
        setIsLink(false)
      }
    }
  }, [editor]);

  useEffect(() => {
    if (isEditMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditMode]);

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
          updateLink();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateLink();

          return false;
        },
        LowPriority
      )
    );
  }, [editor, updateLink]);

  return <Flex align={'center'} gap={'xs'}>
    <ActionIcon onClick={handleClick} variant={isLink ? 'filled' : 'white'} size={'md'} color="gray">
      <IconLink />
    </ActionIcon>
    <Popover
      opened={isPopoverOpen}
    >
      <Popover.Dropdown top={position.top} left={position.left}>
        <Flex align={'center'} gap={'xs'}>
          <Input ref={inputRef} value={url} onChange={handleChange} onKeyDown={handleKeyDown} disabled={!isEditMode} size={'xs'} />
          <ActionIcon onClick={handleToggleEditMode} variant={'white'} size={'md'}>
            <IconEdit />
          </ActionIcon>
        </Flex>
      </Popover.Dropdown>
    </Popover>
  </Flex>
}

export default Link
