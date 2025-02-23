'use client';
import { Box, Center } from '@chakra-ui/react';
import React from 'react';
import PendingPaymentList from '../../../../components/export/export-payments/PendingPaymentList';
import IsOnboarding from '../../../../components/ui/IsOnboarding';

function ExportPaymentsPage(): React.JSX.Element {
  return (
    <Box my={'20px'} mx={'auto'}>
      <Center>
        <PendingPaymentList />
      </Center>
    </Box>
  );
}

export default IsOnboarding(ExportPaymentsPage);
