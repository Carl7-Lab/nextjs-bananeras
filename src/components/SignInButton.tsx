'use client';
import { Link } from '@chakra-ui/next-js';
import { Container, Text } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import React from 'react';

export const SignInButton = (): React.JSX.Element => {
  const { data: session } = useSession();

  if (session && session.user)
    return (
      <>
        <Container backgroundColor={'gray.200'}>
          <Text color='navy.400'>{session?.user?.name}</Text>
          <Link href={'/api/auth/signout'} color={'green.400'}>
            Sign Out
          </Link>
        </Container>
      </>
    );

  return (
    <Container backgroundColor={'gray.200'}>
      <Link href={'/api/auth/signin'} color={'red.400'}>
        Sign in
      </Link>
      <Link href={'/signup'} color={'green.400'}>
        Sign up
      </Link>
    </Container>
  );
};
