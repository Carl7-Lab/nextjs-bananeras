'use client';
import { Box, Center } from '@chakra-ui/react';
import React from 'react';
import ExportList from '../../../../components/export/ExportList';
import IsOnboarding from '../../../../components/ui/IsOnboarding';

function MaterialsExportPage(): React.JSX.Element {
  return (
    <Box my={'20px'} mx={'auto'}>
      <Center>
        <ExportList />
      </Center>
    </Box>
  );
}

export default IsOnboarding(MaterialsExportPage);
