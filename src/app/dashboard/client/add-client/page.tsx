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
              base: '97%',
              sm: '95%',
              md: '100%',
              lg: '100%',
              xl: '100%',
              '2xl': '100%',
            }}
            my={'30px'}
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
