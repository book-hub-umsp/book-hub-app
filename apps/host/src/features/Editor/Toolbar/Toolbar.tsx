import { Flex, Divider, Box } from '@mantine/core'

import { History } from './History'
import { BlockTypes } from './BlockTypes'
import { TextStyles } from './TextStyles'
import { TextAlign } from './TextAlign'
import { Link } from './Link'
import { Image } from './Image'
import { Comment } from './Comment'

import type { FC } from 'react'

const Toolbar: FC = () => <Box p={'sm'} py={'xs'}>
  <Flex align={'center'} gap={'md'}>
    <History />
    <Divider orientation="vertical" />
    <BlockTypes />
    <Divider orientation="vertical" />
    <TextStyles />
    <Divider orientation="vertical" />
    <TextAlign />
    <Divider orientation="vertical" />
    <Link />
    <Divider orientation="vertical" />
    <Image />
    <Divider orientation="vertical" />
    <Comment />
  </Flex>
</Box>

export default Toolbar;
