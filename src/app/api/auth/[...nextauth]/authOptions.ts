import { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import { BACKEND_URL } from '@/lib/constants';

async function refreshToken(token: JWT): Promise<JWT> {
  const res = await fetch(BACKEND_URL + '/auth/merchant/refresh', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${token.refreshToken}`,
    },
  });

  const response = await res.json();

  return {
    ...token,
    ...response,
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Email',
          type: 'text',
          placeholder: 'test@test.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials?.password) return null;
        const { username, password } = credentials;
        const res = await fetch(BACKEND_URL + '/auth/merchant/login', {
          method: 'POST',
          body: JSON.stringify({
            email: username,
            password,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (res.status == 401) {
          return null;
        }

        const user = await res.json();
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };
      if (new Date().getTime() < token.exp) return token;

      return await refreshToken(token);
    },
    async session({ token, session }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
};
