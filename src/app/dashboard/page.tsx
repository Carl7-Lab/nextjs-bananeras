'use client';
import { Box, Center, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import TableExport from '../../components/export/table-export/TableExport';
import TableProducers from '../../components/producer/table-producer/TableProducers';
import IsOnboarding from '../../components/ui/IsOnboarding';

interface WindowSizeProps {
  width: number | null;
  height: number | null;
}

const DashboardPage = (): JSX.Element => {
  const [windowSize, setWindowSize] = useState<WindowSizeProps>({
    width: null,
    height: null,
  });

  useEffect(() => {
    function handleResize(): void {
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
      my={'33px'}
      mx={'auto'}
      width={{
        sm: `${Number(windowSize.width) - 20}px`,
        md: `${Number(windowSize.width) - 300}px`,
      }}
    >
      <Center>
        <Flex flexDirection={'column'} width='100%' py={'4px'} gap={'20px'}>
          <TableProducers
            windowSize={windowSize}
            width={{
              sm: Number(windowSize.width) - 20,
              md: Number(windowSize.width) - 300,
            }}
          />
          <TableExport
            windowSize={windowSize}
            width={{
              sm: Number(windowSize.width) - 20,
              md: Number(windowSize.width) - 300,
            }}
          />
        </Flex>
      </Center>
    </Box>
  );
};

export default IsOnboarding(DashboardPage);
