'use client';
import { Box, Card, CardBody, Center } from '@chakra-ui/react';
import React from 'react';
import AddProducerForm from '../../../../components/producer/AddProducerForm';
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
              <AddProducerForm />
            </CardBody>
          </Card>
        </Center>
      </Box>
    </>
  );
}

export default IsOnboarding(AddProductorPage);
