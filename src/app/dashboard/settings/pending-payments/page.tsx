'use client';
import { Box, Center } from '@chakra-ui/react';
import React from 'react';
import PendingPaymentList from '../../../../components/export/export-payments/PendingPaymentList';

function ExportPaymentspage() {
  return (
    <Box my={'20px'} mx={'auto'}>
      <Center>
        <PendingPaymentList />
      </Center>
    </Box>
  );
}

export default ExportPaymentspage;
