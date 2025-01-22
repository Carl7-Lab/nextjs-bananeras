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
import AddClientForm from '../../../../components/settings/AddClientForm';
import IsOnboarding from '../../../../components/ui/IsOnboarding';

function AddClientPage() {
  return (
    <>
      <Box my={'20px'} mx={'auto'} w={'95%'}>
        <Center>
          <Card
            w={{
              base: '95%',
              sm: '95%',
              md: '90%',
              lg: '100%',
              xl: '100%',
            }}
            mb={'20px'}
          >
            <CardHeader w={'100%'}>
              <Heading>Agregar Nuevo Cliente</Heading>
            </CardHeader>
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
