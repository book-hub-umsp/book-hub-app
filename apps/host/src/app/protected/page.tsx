'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ProtectedPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  if (status === 'loading') {
    return <p>Загрузка...</p>
  }

  return (
    <div>
      <h1>Эта страница доступна только авторизованным пользователям</h1>
      <p>Привет, {session?.user?.name}!</p>
    </div>
  )
}
