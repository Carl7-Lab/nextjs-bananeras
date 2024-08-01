'use client';
import { Box, Card, CardBody, Center } from '@chakra-ui/react';
import React from 'react';
import UploadLogoForm from '../../../../components/producer/UploadLogoForm';
import IsOnboarding from '../../../../components/ui/IsOnboarding';

function UploadLogoPage() {
  return (
    <>
      <Box my={'20px'} mx={'auto'}>
        <Center>
          <Card
            w={{
              base: '95%',
              sm: '450px',
              md: '500px',
              lg: '600px',
              xl: '600px',
              '2xl': '700px',
            }}
            mb={'20px'}
          >
            <CardBody w='100%'>
              <UploadLogoForm />
            </CardBody>
          </Card>
        </Center>
      </Box>
    </>
  );
}

export default IsOnboarding(UploadLogoPage);
