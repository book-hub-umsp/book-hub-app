import { useState, useEffect } from 'react'
import { Flex, Input, Divider, Text, Button, Checkbox } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'

import type { FC } from 'react'

type CommonFilter = {
  type: 'checkbox'
  name: string
  title: string
}

type CheckboxFilter = CommonFilter & {
  type: 'checkbox'
  options: Array<{ value: string; label: string }>
}

type Filter = CheckboxFilter

const filters: Filter[] = [
  {
    type: 'checkbox',
    title: 'Жанр',
    name: 'genre',
    options: [
      {
        value: 'fantasy',
        label: 'Fantasy',
      },
      {
        value: 'fantastic',
        label: 'Fantastic',
      },
    ],
  },
  {
    type: 'checkbox',
    title: 'Автор',
    name: 'author',
    options: [
      {
        value: 'author1',
        label: 'Author 1',
      },
    ],
  },
  {
    type: 'checkbox',
    title: 'Теги',
    name: 'tags',
    options: [
      {
        value: 'tag1',
        label: 'Tag 1',
      },
      {
        value: 'tag2',
        label: 'Tag 2',
      },
      {
        value: 'tag3',
        label: 'Tag 3',
      },
      {
        value: 'tag4',
        label: 'Tag 4',
      },
    ],
  },
]

type CheckboxFilterBlockProps = {
  filter: CheckboxFilter
  onChange: (key: string, value: unknown) => void
  value: Record<string, unknown>
}

const CheckboxFilterBlock: FC<CheckboxFilterBlockProps> = ({
  filter,
  onChange,
  value,
}) => {
  const [opened, { open, close }] = useDisclosure(false)

  const handleChange = (value: string[]) => onChange(filter.name, value)

  return (
    <Flex direction={'column'} gap={'xs'}>
      <Checkbox.Group
        value={value[filter.name] as string[]}
        onChange={handleChange}
      >
        <Flex direction={'column'} gap={'xs'}>
          {filter.options
            .slice(0, opened ? 5 : filter.options.length)
            .map((item) => (
              <Checkbox
                key={item.value}
                value={item.value}
                label={item.label}
              />
            ))}
        </Flex>
      </Checkbox.Group>
      {filter.options.length > 5 && (
        <Button
          onClick={opened ? close : open}
          variant={'transparent'}
          size={'sm'}
        >
          {opened ? 'Скрыть все' : 'Показать все'}
        </Button>
      )}
    </Flex>
  )
}

type FilterBlockProps = {
  filter: Filter
  onChange: (key: string, value: unknown) => void
  value: Record<string, unknown>
}

const FilterBlock: FC<FilterBlockProps> = ({ filter, onChange, value }) => {
  switch (filter.type) {
    case 'checkbox': {
      return (
        <CheckboxFilterBlock
          filter={filter}
          onChange={onChange}
          value={value}
        />
      )
    }
    default: {
      return null
    }
  }
}

const BooksFilters = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const [currentFilters, setCurrentFilters] = useState<Record<string, unknown>>(
    {},
  )

  const handleFilterChange = (key: string, value: unknown) => {
    setCurrentFilters({
      ...currentFilters,
      [key]: value,
    })
  }

  const handleResetFilters = () => {
    setCurrentFilters({})
  }

  const handleApplyFilters = () => {
    const current = new URLSearchParams(searchParams.toString())

    if (Object.keys(currentFilters).length !== 0) {
      current.set('filters', JSON.stringify(currentFilters))
    } else {
      current.delete('filters')
    }

    const search = current.toString()
    const query = search ? `?${search}` : ''

    router.push(`${pathname}${query}`)
  }

  useEffect(() => {
    const filters = searchParams.get('filters')

    filters && setCurrentFilters(JSON.parse(filters))
  }, [searchParams])

  return (
    <Flex direction={'column'} gap={'lg'}>
      <Input placeholder={'Поиск'} />
      {filters.map((filter) => (
        <Flex key={filter.name} direction={'column'} gap={'xs'}>
          <Divider flex={1} />
          <Text fw={700}>{filter.title}</Text>
          <FilterBlock
            filter={filter}
            onChange={handleFilterChange}
            value={currentFilters}
          />
        </Flex>
      ))}
      <Flex gap={'xs'}>
        <Button onClick={handleApplyFilters}>Применить</Button>
        <Button onClick={handleResetFilters} variant={'subtle'}>
          Сбросить
        </Button>
      </Flex>
    </Flex>
  )
}

export default BooksFilters
