'use client'
import { signIn, signOut, useSession } from 'next-auth/react'

const Index = () => {
  const { data: session } = useSession()

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '50px',
      }}
    >
      <h1>Главная страница</h1>
      {session ? (
        <>
          <p>Привет, {session.user.name}!</p>
          <button onClick={() => signOut()}>Выйти</button>
        </>
      ) : (
        <button onClick={() => signIn('google')}>Войти через Google</button>
      )}
    </div>
  )
}

export default Index
