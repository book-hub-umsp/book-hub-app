'use client'
import { Flex, Group, Autocomplete } from '@mantine/core'
import { AuthButton } from '@features/AuthButton'

import type { AutocompleteProps } from '@mantine/core'

const books = {
  'Book 1': {
    id: '1',
    title: 'Book 1',
  },
  'Book 2': {
    id: '2',
    title: 'Book 2',
  },
  'Book 3': {
    id: '3',
    title: 'Book 3',
  },
} as Record<string, { id: string; title: string }>

const renderAutocompleteOption: AutocompleteProps['renderOption'] = ({
  option,
}) => books[option.value].title

const AppHeader = () => {
  return (
    <Group h="100%" px="md">
      <Flex flex={1}>
        <Autocomplete
          variant={'filled'}
          placeholder={'Найти книги'}
          flex={1}
          data={Object.keys(books)}
          renderOption={renderAutocompleteOption}
        />
        <Flex justify={'flex-end'} flex={1}>
          <AuthButton />
        </Flex>
      </Flex>
    </Group>
  )
}

export default AppHeader
