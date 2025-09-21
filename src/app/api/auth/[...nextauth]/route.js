import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Usuário', type: 'text' },
        password: { label: 'Senha', type: 'password' }
      },
      async authorize(credentials) {
        if (credentials?.username === process.env.ADMIN_USERNAME && 
            credentials?.password === process.env.ADMIN_PASSWORD) {
          return {
            id: '1',
            name: 'Administrador',
            email: 'admin@pesqueaguasclaras.com',
            role: 'admin'
          }
        }
        return null
      }
    })
  ],
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      session.user.role = token.role
      return session
    },
  },
  session: {
    strategy: 'jwt',
  },
})

export { handler as GET, handler as POST }