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
import SignUpForm from '../../../components/signup/SignUpForm';
import { Logo } from '../../../components/ui/Logo';

const SignUpPage = () => {
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
        <Heading
          color='blackAlpha.900'
          fontWeight='bold'
          fontSize='3xl'
          mt='24px'
        >
          Hey, Hola 👋
        </Heading>
        <Text color='blackAlpha.700' fontSize='md' mt='8px'>
          Crea una cuenta para empezar a usar ...
        </Text>

        <Card variant='unstyled' mt='20px'>
          <CardBody w='100%'>
            <SignUpForm />
          </CardBody>
        </Card>

        <Center>
          <Text mt='20px'>
            ¿Ya estás registrado?{' '}
            <Link as={Link_Next} color='teal.500' href='/auth/signin'>
              Iniciar sesión
            </Link>
          </Text>
        </Center>
      </Flex>
    </Center>
  );
};

export default SignUpPage;
