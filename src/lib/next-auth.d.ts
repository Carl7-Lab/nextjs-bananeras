import { JWT } from 'next-auth/jwt';
import NextAuth from 'next-auth/next';

declare module 'next-auth' {
  interface Session {
    user: {
      id: number;
      email: string;
      name: string;
      exporterId: string;
    };
    accessToken: string;
    refreshToken: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: {
      id: number;
      email: string;
      name: string;
      exporterId: string;
    };
    accessToken: string;
    refreshToken: string;
    exp: number;
  }
}
