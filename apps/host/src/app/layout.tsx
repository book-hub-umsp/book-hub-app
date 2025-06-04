'use client'
import { ColorSchemeScript, MantineProvider, AppShell } from '@mantine/core'
import '@mantine/core/styles.css'
import { SessionProvider } from 'next-auth/react'
import type { ReactNode } from 'react'
import type { NextPage } from 'next'

import { AppHeader, AppMenu } from '../components'

type RootLayoutProps = {
  children: ReactNode
}

const RootLayout: NextPage<RootLayoutProps> = ({ children }) => {
  return (
    <html lang={'ru'} suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <SessionProvider>
          <MantineProvider>
            <AppShell
              header={{ height: 60 }}
              navbar={{
                width: 300,
                breakpoint: 'sm',
              }}
              padding="md"
            >
              <AppShell.Header>
                <AppHeader />
              </AppShell.Header>
              <AppShell.Navbar p="md">
                <AppMenu />
              </AppShell.Navbar>
              <AppShell.Main>{children}</AppShell.Main>
            </AppShell>
          </MantineProvider>
        </SessionProvider>
      </body>
    </html>
  )
}

export default RootLayout
