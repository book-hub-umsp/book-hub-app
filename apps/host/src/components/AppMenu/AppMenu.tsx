'use client'
import { Flex, NavLink } from '@mantine/core'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IconHome } from '@tabler/icons-react'

const items = [
  {
    href: '/',
    name: 'Главная',
    icon: IconHome,
  },
]

const AppMenu = () => {
  const pathname = usePathname()

  return (
    <Flex direction={'column'} gap={'sm'}>
      {items.map((item) => {
        const Icon = item.icon

        return (
          <NavLink
            key={item.href}
            href={item.href}
            label={item.name}
            component={Link}
            active={pathname === item.href}
            leftSection={<Icon size={16} />}
          />
        )
      })}
    </Flex>
  )
}

export default AppMenu
