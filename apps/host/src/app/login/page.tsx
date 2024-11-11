'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { LoginButton } from './LoginButton'

export default function LoginPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/')
    }
  }, [status, router])

  if (status === 'loading') {
    return <p>Загрузка...</p>
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '50px',
      }}
    >
      <h1>Войти в аккаунт</h1>
      <LoginButton />
    </div>
  )
}
