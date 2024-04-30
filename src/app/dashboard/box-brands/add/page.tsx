'use client';
import { Box, Card, CardBody, Center } from '@chakra-ui/react';
import AddBoxBrandsForm from '../../../../components/box-brands/AddBoxBrandsForm';
import IsOnboarding from '../../../../components/ui/IsOnboarding';

function AgregarPage() {
  return (
    <>
      <Box mt={'400px'} mb={'25px'}>
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
              <AddBoxBrandsForm />
            </CardBody>
          </Card>
        </Center>
      </Box>
    </>
  );
}

export default IsOnboarding(AgregarPage);
