'use client';
import { Box, Card, CardBody, Center } from '@chakra-ui/react';
import React from 'react';
import AddClientForm from '../../../../components/settings/AddClientForm';
import IsOnboarding from '../../../../components/ui/IsOnboarding';

function AddClientPage() {
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
              <AddClientForm />
            </CardBody>
          </Card>
        </Center>
      </Box>
    </>
  );
}

export default IsOnboarding(AddClientPage);
