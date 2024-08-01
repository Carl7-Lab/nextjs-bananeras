'use client';
import { Box, Card, CardBody, Center, Heading } from '@chakra-ui/react';
import { redirect, useParams, usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useLayoutEffect } from 'react';
import SentMaterialsExportForm from '../../../../../components/export/SentMaterialsExportForm';
import IsOnboarding from '../../../../../components/ui/IsOnboarding';
import { useExport } from '../../../../../hooks/export/getExport';
import { ExportType } from '../../../../../types/export';

const PendingExportPage = () => {
  const params = useParams<{ id: string }>();
  const { data, isLoading, refetch, error } = useExport({
    exportId: params.id,
  });
  const pendingExport = data as Partial<ExportType>;
  const pathname = usePathname();
  const router = useRouter();

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

  useLayoutEffect(() => {
    if (!isLoading) {
      // console.log('PendingExportPage pendingExport', pendingExport);
      if (!pendingExport || !pendingExport.pendingExportSent) {
        return redirect(pathname.replace(/\/\d+$/, ''));
      }
    }
  }, [isLoading, pendingExport, pathname]);

  if (isLoading) {
    return (
      <Box mx={'auto'} my={'200px'}>
        <Center>
          <Heading>Cargando...</Heading>
        </Center>
      </Box>
    );
  }

  return (
    <Box my={'20px'} mx={'auto'}>
      <Center>
        <Card
          w={{
            base: '95%',
            sm: '95%',
            md: '90%',
            lg: '85%',
            xl: '65%',
            '2xl': '70%',
          }}
          mb={'20px'}
        >
          <CardBody w='100%'>
            <SentMaterialsExportForm
              exportSelected={pendingExport}
              pathname={pathname}
            />
          </CardBody>
        </Card>
      </Center>
    </Box>
  );
};

export default IsOnboarding(PendingExportPage);
