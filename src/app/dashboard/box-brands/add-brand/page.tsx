'use client';
import { Box, Card, CardBody, Center } from '@chakra-ui/react';
import React from 'react';
import AddBrandForm from '../../../../components/box-brands/specifications/brand/AddBrandForm';
import IsOnboarding from '../../../../components/ui/IsOnboarding';

function AddBrandPage() {
  return (
    <>
      <Box my={'auto'} mx={'auto'}>
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
          >
            <CardBody w='100%'>
              <AddBrandForm />
            </CardBody>
          </Card>
        </Center>
      </Box>
    </>
  );
}

export default IsOnboarding(AddBrandPage);
