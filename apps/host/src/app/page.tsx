import type { NextPage } from 'next'
import { AuthButton } from '@features/AuthButton'

const Index: NextPage = () => {
  return (
    <main>
      <h1>Добро пожаловать!</h1>
      <AuthButton />
    </main>
  )
}

export default Index
