import {
  Box,
  Center,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import PendingPaymentCard from './PendingPaymentCard';
import { useExportsSentPending } from '../../../hooks/export/export-sent/getExportsSentPending';
import { usePagination } from '../../../hooks/usePagination';
import { ExportSentType } from '../../../types/exportSent';

const PendingPaymentList = () => {
  const { paginationParams, filterProps } = usePagination();
  const {
    data = [],
    isLoading,
    refetch,
    error,
  } = useExportsSentPending(paginationParams);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!!error) {
      const { response } = error as any;
      const { data: dataRes } = response;
      const { statusCode, message, error: errorTitle, model, prop } = dataRes;

      if (statusCode === 401) {
        router.push('/api/auth/signout');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  if (isLoading) {
    return (
      <Box mx={'auto'} my={'200px'}>
        <Center>
          <Heading>Cargando...</Heading>
        </Center>
      </Box>
    );
  }

  if (!!error) {
    const { response } = error as any;
    const { data: dataRes } = response;
    const { statusCode, message, error: errorTitle } = dataRes;

    return (
      <Box mx={'auto'} my={'200px'}>
        <Center>
          <VStack spacing={2} align='center'>
            <Heading>
              {statusCode} - {errorTitle}
            </Heading>
            <Text>{message}</Text>
          </VStack>
        </Center>
      </Box>
    );
  }

  return (
    <>
      <VStack spacing={4} alignItems='center' justifyContent='center'>
        <Heading width='100%' textAlign='center'>
          Lista de pagos pendientes
        </Heading>
        <SimpleGrid
          columns={{ base: 1, sm: 1, md: 1, lg: 2, xl: 3 }}
          spacing={4}
        >
          {(data as Partial<ExportSentType>[]).map((item) => (
            <PendingPaymentCard
              key={item.id}
              exportSentItem={item}
              pathname={pathname}
            />
          ))}
        </SimpleGrid>
      </VStack>
    </>
  );
};

export default PendingPaymentList;
