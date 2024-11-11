import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import { signIn, signOut, useSession } from 'next-auth/react'

export const LoginButton = () => {
  const { data: session } = useSession()

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      {session ? (
        <>
          <p>Привет, {session.user.name}!</p>
          <button onClick={() => signOut()}>Выйти</button>
        </>
      ) : (
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            signIn('google', { credential: credentialResponse.credential })
          }}
          onError={() => {
            console.log('Ошибка авторизации через Google')
          }}
        />
      )}
    </GoogleOAuthProvider>
  )
}
