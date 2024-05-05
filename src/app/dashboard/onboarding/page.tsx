'use client';
import { Box, Card, CardBody, Center } from '@chakra-ui/react';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React, { useLayoutEffect } from 'react';
import OnboardingForm from '../../../components/onboarding/OnboardingForm';

export default function OnBoardingPage() {
  const { data: session } = useSession();
  const isOnboarded = !!session?.user?.exporterId;

  useLayoutEffect(() => {
    if (isOnboarded) {
      return redirect('/dashboard/producer/fincas');
    }
  }, [isOnboarded]);

  return (
    <>
      <Box my={'20px'} mx={'auto'}>
        <Center>
          <Card
            w={{
              base: '95%',
              sm: '95%',
              md: '90%',
              lg: '600px',
              xl: '600px',
              '2xl': '700px',
            }}
            mb={'20px'}
          >
            <CardBody w='100%'>
              <OnboardingForm />
            </CardBody>
          </Card>
        </Center>
      </Box>
    </>
  );
}
