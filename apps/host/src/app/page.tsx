'use client'
import { Container, Flex, Grid } from '@mantine/core'

import { BooksFilters, BookCard } from '../components'

import styles from './Page.module.css'

import type { NextPage } from 'next'
import type { BookCard as BookCardType } from '@shared/types'

const books: BookCardType[] = [
  {
    id: '1',
    image:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png',
    title: 'Book 1Book 1Book 1Book 1',
    author: 'Author',
    genre: 'Fantasy',
    tags: ['Tag 1', 'Tag 2'],
  },
  {
    id: '2',
    image:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png',
    title: 'Book 2',
    author: 'Author',
    genre: 'Fantasy',
    tags: ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4'],
  },
  {
    id: '3',
    image:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png',
    title: 'Book 3',
    author: 'Author',
    genre: 'Fantasy',
    tags: ['Tag 1', 'Tag 2'],
  },
  {
    id: '4',
    image:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png',
    title: 'Book 4',
    author: 'Author',
    genre: 'Fantasy',
    tags: ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4'],
  },
  {
    id: '5',
    image:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png',
    title: 'Book 5',
    author: 'Author',
    genre: 'Fantasy',
    tags: ['Tag 1', 'Tag 2'],
  },
  {
    id: '6',
    image:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png',
    title: 'Book 6',
    author: 'Author',
    genre: 'Fantasy',
    tags: ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4'],
  },
]

const Page: NextPage = () => {
  return (
    <Container className={styles.root} fluid>
      <Flex gap={48}>
        <div className={styles.filters}>
          <BooksFilters />
        </div>
        <Grid gutter={'xl'} align={'stretch'} className={styles.books}>
          {books.map((item) => (
            <Grid.Col key={item.id} span={3}>
              <BookCard {...item} />
            </Grid.Col>
          ))}
        </Grid>
      </Flex>
    </Container>
  )
}

export default Page
