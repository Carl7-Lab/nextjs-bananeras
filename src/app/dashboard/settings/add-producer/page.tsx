'use client';
import { Box, Card, CardBody, Center } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import React from 'react';
import OnboardingForm from '../../../../components/onboarding/OnboardingForm';
import IsOnboarding from '../../../../components/ui/IsOnboarding';

function AddProductorPage() {
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

export default IsOnboarding(AddProductorPage);
