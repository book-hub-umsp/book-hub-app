import { render } from '@testing-library/react'

import Page from '../src/app/page'
import { MantineProvider } from '@mantine/core'

jest.mock('next-auth/react', () => ({ useSession: () => ({ data: {} }) }))

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

describe('Page', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MantineProvider>
        <Page />
      </MantineProvider>,
    )
    expect(baseElement).toBeTruthy()
  })
})
