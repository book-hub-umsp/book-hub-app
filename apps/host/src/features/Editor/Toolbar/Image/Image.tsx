import { useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ActionIcon, Flex, Popover, Input, Button } from '@mantine/core';
import { IconPhotoSearch } from '@tabler/icons-react';

import { INSERT_IMAGE_COMMAND } from '../../plugins'

import type { FC, ChangeEvent } from 'react'

const fillImageURL = () => prompt("Enter the URL of the image:", "") as string

const Image: FC = () => {
  const [editor] = useLexicalComposerContext();
  const [url, setUrl] = useState<string>('')

  const handleChangeUrl = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setUrl(value)
  }

  const handleAddImageByUrl = () => {
    editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
      altText: url,
      src: url
    });

    setUrl('')
  }

  return <Flex>
    <Popover position={'bottom'}>
      <Popover.Target>
        <ActionIcon variant={'white'} size={'md'} color="gray">
          <IconPhotoSearch />
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown>
        <Flex align={'center'} gap={'xs'}>
          <Input placeholder={'Enter image url'} value={url} onChange={handleChangeUrl} size={'xs'} />
          <Button onClick={handleAddImageByUrl} disabled={!url} size={'xs'}>Add</Button>
        </Flex>
      </Popover.Dropdown>
    </Popover>
  </Flex>
}

export default Image;
