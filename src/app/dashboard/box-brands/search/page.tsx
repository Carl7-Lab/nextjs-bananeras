'use client';
import { Box, Center, Text, useBreakpointValue } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import TableBoxBrand from '../../../../components/box-brands/table-box-brand/TableBoxBrand';
import IsOnboarding from '../../../../components/ui/IsOnboarding';

interface WindowSizeProps {
  width: number | null;
  height: number | null;
}

function SearchBoxBrandPage() {
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
    >
      <Center mt={'30px'}>
        <TableBoxBrand
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

export default IsOnboarding(SearchBoxBrandPage);
