'use client';
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
  Heading,
} from '@chakra-ui/react';
import React from 'react';
import OnboardingForm from '../../../components/onboarding/OnboardingForm';

export default function OnBoardingPage() {
  return (
    <>
      <Box mt='4px' height='90vh' overflow='auto'>
        <Center my={'20px'}>
          <Card
            w={{
              base: '95%',
              sm: '95%',
              md: '90%',
              lg: '600px',
              xl: '600px',
              '2xl': '700px',
            }}
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
