'use client'
import { signIn, signOut, useSession } from 'next-auth/react'
import { Button } from '@mantine/core'

const AuthButton = () => {
  const { data: session } = useSession()

  return (
    <div>
      {session ? (
        <>
          <p>Привет, {session.user?.name}</p>
          <Button onClick={() => signOut()} type={'button'}>
            Выйти
          </Button>
        </>
      ) : (
        <Button onClick={() => signIn('google')} type={'button'}>
          Войти через Google
        </Button>
      )}
    </div>
  )
}

export default AuthButton
