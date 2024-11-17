import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const nextAuthHandler = NextAuth({
  providers: [
    GoogleProvider({
      //@ts-ignore
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      //@ts-ignore
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        //@ts-ignore
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }) {
      //@ts-ignore
      session.accessToken = token.accessToken
      return session
    },
  },
})
