'use client';
import { Box, Center } from '@chakra-ui/react';
import React from 'react';
import PendingCuttingSheetList from '../../../../components/export/cutting-sheet/PendingCuttingSheetList';
import IsOnboarding from '../../../../components/ui/IsOnboarding';

const CuttingSheetsPage = () => {
  return (
    <Box my={'20px'} mx='auto' w={'99%'}>
      <Box my={'20px'} mx={'auto'}>
        <Center>
          <PendingCuttingSheetList />
        </Center>
      </Box>
    </Box>
  );
};

export default IsOnboarding(CuttingSheetsPage);
