'use client'
import { ColorSchemeScript, MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import { SessionProvider } from 'next-auth/react'
import type { ReactNode } from 'react'
import type { NextPage } from 'next'

type RootLayoutProps = {
  children: ReactNode
}

const RootLayout: NextPage<RootLayoutProps> = ({ children }) => (
  <html lang={'ru'} suppressHydrationWarning>
    <head>
      <ColorSchemeScript />
    </head>
    <body>
      <SessionProvider>
        <MantineProvider>{children}</MantineProvider>
      </SessionProvider>
    </body>
  </html>
)
export default RootLayout
