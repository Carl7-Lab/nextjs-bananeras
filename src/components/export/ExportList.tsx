/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Heading,
  SimpleGrid,
  VStack,
  Text,
  Box,
  Center,
} from '@chakra-ui/react';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import ExportCard from './ExportCard';
import { useExportsPending } from '../../hooks/export/getExportsPending';
import { usePagination } from '../../hooks/usePagination';
import { ExportType } from '../../types/export';

const ExportList = (): React.JSX.Element => {
  const { paginationParams } = usePagination();
  const { data = [], isLoading, error } = useExportsPending(paginationParams);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!!error) {
      const { response } = error as any;
      const { data: dataRes } = response;
      const { statusCode } = dataRes;

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
    <VStack spacing={4} alignItems='center' justifyContent='center'>
      <Heading width='100%' textAlign='center'>
        Lista de Exportaciones Pendientes
      </Heading>
      {data.length === 0 ? (
        <Center p={6}>
          <Text>No existen exportaciones pendientes</Text>
        </Center>
      ) : (
        <SimpleGrid
          columns={{ base: 1, sm: 1, md: 1, lg: 2, xl: 3 }}
          spacing={4}
        >
          {(data as Partial<ExportType>[]).map((item) => (
            <ExportCard key={item.id} exportItem={item} pathname={pathname} />
          ))}
        </SimpleGrid>
      )}
    </VStack>
  );
};

export default ExportList;
