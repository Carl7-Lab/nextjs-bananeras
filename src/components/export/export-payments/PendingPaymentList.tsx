import { Heading, SimpleGrid, VStack } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import PendingPaymentCard from './PendingPaymentCard';
import { useExportsSentNotSent } from '../../../hooks/export/export-sent/getExportsSentNotSend';
import { usePagination } from '../../../hooks/usePagination';
import { ExportSentType } from '../../../types/exportSent';

const PendingPaymentList = () => {
  const { paginationParams, filterProps } = usePagination();
  const { data, isLoading, refetch } = useExportsSentNotSent(paginationParams);

  useEffect(() => {
    if (!isLoading) {
      console.log('PendingPaymentList isLoading: ', isLoading);
      console.log('PendingPaymentList data: ', data);
    }
  }, [data, isLoading]);

  return (
    <>
      {!isLoading ? (
        <VStack spacing={4} alignItems='center' justifyContent='center'>
          <Heading width='100%' textAlign='center'>
            Lista de pagos pendientes
          </Heading>
          <SimpleGrid
            columns={{ base: 1, sm: 1, md: 1, lg: 2, xl: 3 }}
            spacing={4}
          >
            {(data as Partial<ExportSentType>[]).map((item) => (
              <PendingPaymentCard key={item.id} exportSentItem={item} />
            ))}
          </SimpleGrid>
        </VStack>
      ) : (
        <Heading>Cargando...</Heading>
      )}
    </>
  );
};

export default PendingPaymentList;
