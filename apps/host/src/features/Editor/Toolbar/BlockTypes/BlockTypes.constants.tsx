import { IconTextSize, IconBlockquote, IconCode, IconH1, IconH2, IconList, IconListNumbers } from '@tabler/icons-react'

import { BlockTypesEnum } from './BlockTypes.types'

import type { ReactNode } from 'react'
import type { ComboboxData } from '@mantine/core'

export const names: Record<BlockTypesEnum, string> = {
  [BlockTypesEnum.Paragraph]: 'Normal',
  [BlockTypesEnum.Quote]: 'Quote',
  [BlockTypesEnum.Code]: 'Code block',
  [BlockTypesEnum.H1]: 'Large heading',
  [BlockTypesEnum.H2]: 'Small heading',
  [BlockTypesEnum.UL]: 'Bulleted list',
  [BlockTypesEnum.OL]: 'Numbered list',
}

export const icons: Record<BlockTypesEnum, ReactNode> = {
  [BlockTypesEnum.Paragraph]: <IconTextSize />,
  [BlockTypesEnum.Quote]: <IconBlockquote />,
  [BlockTypesEnum.Code]: <IconCode />,
  [BlockTypesEnum.H1]: <IconH1 />,
  [BlockTypesEnum.H2]: <IconH2 />,
  [BlockTypesEnum.UL]: <IconList />,
  [BlockTypesEnum.OL]: <IconListNumbers />,
}

export const selectOptions: ComboboxData = [
  {
    value: BlockTypesEnum.Paragraph,
    label: names[BlockTypesEnum.Paragraph]
  },
  {
    value: BlockTypesEnum.Quote,
    label: names[BlockTypesEnum.Quote]
  },
  {
    value: BlockTypesEnum.Code,
    label: names[BlockTypesEnum.Code]
  },
  {
    value: BlockTypesEnum.H1,
    label: names[BlockTypesEnum.H1]
  },
  {
    value: BlockTypesEnum.H2,
    label: names[BlockTypesEnum.H2]
  },
  {
    value: BlockTypesEnum.UL,
    label: names[BlockTypesEnum.UL]
  },
  {
    value: BlockTypesEnum.OL,
    label: names[BlockTypesEnum.OL]
  },
]
