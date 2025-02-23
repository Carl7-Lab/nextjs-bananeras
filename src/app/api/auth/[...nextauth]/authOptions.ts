/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import { BACKEND_URL } from '@/lib/constants';

async function refreshToken(token: JWT): Promise<JWT> {
  const res = await fetch(BACKEND_URL + '/auth/exporter/refresh', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${token.refreshToken}`,
    },
  });

  const response = await res.json();

  return {
    ...token,
    ...response,
    user: {
      ...token.user,
    },
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
        const res = await fetch(BACKEND_URL + '/auth/exporter/login', {
          method: 'POST',
          body: JSON.stringify({
            email: username,
            password,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log('res.status: ', res.status);
        // console.log('res: ', res);

        if (res.status == 201) {
          const user = await res.json();
          console.log('user login: ', user);
          return user;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === 'update' && session?.onboardingStatus) {
        token.user.onboardingStatus = session.onboardingStatus;
      }
      if (user) return { ...token, ...user };
      if (new Date().getTime() < token.exp) return token;

      return await refreshToken(token);
    },

    async session({ token, session }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.user.onboardingStatus = token.user.onboardingStatus;
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
  },
};
