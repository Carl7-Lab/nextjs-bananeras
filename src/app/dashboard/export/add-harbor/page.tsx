'use client';
import { Box, Card, CardBody, Center } from '@chakra-ui/react';
import React from 'react';
import AddHarborForm from '../../../../components/settings/AddHarborForm';
import IsOnboarding from '../../../../components/ui/IsOnboarding';

function AddHarborPage() {
  return (
    <>
      <Box mt={'20px'} mx={'auto'}>
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
            mb={'30px'}
          >
            <CardBody w='100%'>
              <AddHarborForm />
            </CardBody>
          </Card>
        </Center>
      </Box>
    </>
  );
}

export default IsOnboarding(AddHarborPage);
