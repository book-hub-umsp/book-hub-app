'use client'
import { Card, Image, Text, Badge, Group, Flex } from '@mantine/core'
import Link from 'next/link'

import styles from './BookCard.module.css'

import type { FC } from 'react'
import type { BookCard as BookCardType } from '@shared/types'

const BookCard: FC<BookCardType> = ({
  id,
  image,
  title,
  author,
  tags,
  genre,
}) => {
  return (
    <Card
      shadow={'sm'}
      padding={'lg'}
      radius={'md'}
      component={Link}
      href={`/book/${id}`}
      className={styles.root}
      withBorder
    >
      <Card.Section>
        <Image src={image} height={160} alt={title} />
      </Card.Section>
      <Group justify={'space-between'} mt={'md'} mb={'xs'} wrap={'nowrap'}>
        <Text fw={500} lineClamp={1} truncate>
          {title}
        </Text>
        <Badge color={'yellow'}>{genre}</Badge>
      </Group>
      <Flex direction={'column'} gap={'md'}>
        <Text size={'sm'} c={'dimmed'}>
          {author}
        </Text>
        <Flex gap={'sm'} wrap={'wrap'}>
          {tags.map((item) => (
            <Badge key={item} color={'gray'}>
              {item}
            </Badge>
          ))}
        </Flex>
      </Flex>
    </Card>
  )
}

export default BookCard
