'use client';
import { Box, Button, Center, Flex, Link } from '@chakra-ui/react';
import Link_Next from 'next/link';
import React, { useEffect, useState } from 'react';
import TableBankAccounts from '../../../../components/client/table-bank-accounts/TableBankAccounts';
import IsOnboarding from '../../../../components/ui/IsOnboarding';

interface WindowSizeProps {
  width: number | null;
  height: number | null;
}

function BankAccountsPage(): React.JSX.Element {
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
      my={'27px'}
      mx={'auto'}
      width={{
        sm: `${Number(windowSize.width) - 20}px`,
        md: `${Number(windowSize.width) - 300}px`,
      }}
    >
      <Link
        as={Link_Next}
        href={'/dashboard/client/add-bank-account'}
        _hover={{
          bg: 'green.600',
          color: 'white',
        }}
      >
        <Flex justify='flex-end' width='100%'>
          <Button colorScheme='teal'>Agregar Cuenta Bancaria</Button>
        </Flex>
      </Link>
      <Center mt={'24px'}>
        <TableBankAccounts
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

export default IsOnboarding(BankAccountsPage);
