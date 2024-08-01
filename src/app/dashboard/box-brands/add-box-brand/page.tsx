'use client';
import { Box, Card, CardBody, Center } from '@chakra-ui/react';
import AddBoxBrandsForm from '@/components/box-brands/AddBoxBrandsForm';
import IsOnboarding from '../../../../components/ui/IsOnboarding';

function AddBoxBrandPage() {
  return (
    <>
      <Box my={'20px'} mx={'auto'}>
        <Center>
          <Card
            w={{
              base: '95%',
              sm: '95%',
              md: '90%',
              lg: '85%',
              xl: '67%',
              '2xl': '70%',
            }}
            mb={'20px'}
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

export default IsOnboarding(AddBoxBrandPage);
