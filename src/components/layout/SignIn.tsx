'use client';
import { Button, Input } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import React, { useRef } from 'react';

type Props = {
  className?: string;
  callbackUrl?: string;
  error?: string;
};

const Login = (props: Props) => {
  const router = useRouter();
  const userName = useRef('');
  const pass = useRef('');
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await signIn('credentials', {
      username: userName.current,
      password: pass.current,
      redirect: true,
      callbackUrl: props.callbackUrl ?? 'http://localhost:3000',
    });
  };

  return (
    <div className={props.className}>
      <div>Login Form</div>
      {!!props.error && <p>Authentication Failed</p>}
      <form onSubmit={onSubmit}>
        <Input
          name='username'
          placeholder='User Name'
          onChange={(e) => (userName.current = e.target.value)}
        />
        <Input
          name='password'
          type='password'
          onChange={(e) => (pass.current = e.target.value)}
        />
        <div>
          <Button type='submit'>Sign In</Button>
          <Link href={props.callbackUrl ?? '/'}>Cancel</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
