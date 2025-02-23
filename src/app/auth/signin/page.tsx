'use client';

import {
  Card,
  CardBody,
  Center,
  Flex,
  Heading,
  Link,
  Text,
} from '@chakra-ui/react';
import Link_Next from 'next/link';
import SignInForm from '../../../components/signin/SignInForm';
import { Logo } from '../../../components/ui/Logo';

type Props = {
  searchParams?: Record<'callbackUrl' | 'error', string>;
};

const SignInPage = (props: Props): JSX.Element => {
  return (
    <Center minH='100vh'>
      <Flex
        flexDirection='column'
        py='20px'
        px='16px'
        w={{
          base: '288px',
          sm: '288px',
          md: '288px',
          lg: '480px',
          xl: '480px',
          '2xl': '480px',
        }}
      >
        <Logo />
        <Heading fontWeight='bold' fontSize='3xl' mt='24px'>
          Hey, Hola 👋
        </Heading>
        <Text fontSize='md' mt='8px'>
          Introduce la información que proporcionaste al registrarte.
        </Text>

        <Card variant='unstyled' mt='20px'>
          <CardBody w='100%'>
            <SignInForm
              error={props.searchParams?.error}
              callbackUrl={props.searchParams?.callbackUrl}
            />
          </CardBody>
        </Card>

        <Center>
          <Text mt='20px'>
            ¿No tienes una cuenta?{' '}
            <Link as={Link_Next} color='teal.500' href='/auth/signup'>
              Registrarse
            </Link>
          </Text>
        </Center>
      </Flex>
    </Center>
  );
};

export default SignInPage;
