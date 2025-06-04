'use client'
import { Fragment } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { Button, Modal, Menu, Avatar, Flex } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconLogin, IconLogout } from '@tabler/icons-react'

const AuthButton = () => {
  const { data: session } = useSession()
  const [opened, { open, close }] = useDisclosure(false)

  if (session) {
    return (
      <Menu>
        <Menu.Target>
          <Button type={'button'} variant={'transparent'} onClick={open}>
            <Flex align={'center'} gap={'xs'}>
              <Avatar
                src={session.user?.image}
                size={'sm'}
                radius={'xl'}
                variant={'filled'}
              />
              {session.user?.name}
            </Flex>
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            onClick={() => signOut()}
            leftSection={<IconLogout size={14} />}
            color={'red'}
          >
            Выйти
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    )
  }

  return (
    <Fragment>
      <Button
        onClick={open}
        type={'button'}
        rightSection={<IconLogin size={16} />}
      >
        Войти
      </Button>
      <Modal opened={opened} onClose={close} title="Авторизация">
        <Button
          onClick={() => signIn('google')}
          type={'button'}
          variant={'light'}
          size={'md'}
        >
          Войти через Google
        </Button>
      </Modal>
    </Fragment>
  )
}

export default AuthButton
