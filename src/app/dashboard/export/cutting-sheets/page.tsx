'use client';
import { Box, Center } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import TableCuttingSheets from '../../../../components/export/cutting-sheet/table-cutting-sheets/TableCuttingSheets';
import IsOnboarding from '../../../../components/ui/IsOnboarding';

interface WindowSizeProps {
  width: number | null;
  height: number | null;
}

function SearchCuttingSheetsPage() {
  const [windowSize, setWindowSize] = useState<WindowSizeProps>({
    width: null,
    height: null,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Box
      my={'auto'}
      mx={'auto'}
      width={{
        sm: `${Number(windowSize.width) - 20}px`,
        md: `${Number(windowSize.width) - 300}px`,
      }}
      height={`${windowSize.height ? windowSize.height * 0.8 + 'px' : 'auto'}`}
    >
      <Center>
        <TableCuttingSheets
          windowSize={windowSize}
          width={{
            sm: Number(windowSize.width) - 20,
            md: Number(windowSize.width) - 300,
          }}
        />
      </Center>
    </Box>
  );
}

export default IsOnboarding(SearchCuttingSheetsPage);
