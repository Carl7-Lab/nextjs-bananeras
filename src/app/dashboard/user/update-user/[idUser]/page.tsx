'use client';
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
  Heading,
  Text,
} from '@chakra-ui/react';
import UpdateExporterForm from '../../../../../components/settings/UpdateExporterForm';
import IsOnboarding from '../../../../../components/ui/IsOnboarding';
import { useExporter, UserProfile } from '../../../../../hooks/useUserProfile';

const UpdateExporterPage = (): JSX.Element => {
  const { user, isLoading } = useExporter();
  const exporter = user as Partial<UserProfile>;

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
    <Box my={'20px'} mx='auto' w={'95%'}>
      <Center>
        <Card
          w={{
            base: '95%',
            sm: '95%',
            md: '90%',
            lg: '100%',
            xl: '100%',
          }}
          mb={'20px'}
        >
          <CardHeader w={'100%'}>
            <Heading>Edición de la Exportadora</Heading>
          </CardHeader>
          <CardBody w={'100%'}>
            {exporter.exporterDetails ? (
              <UpdateExporterForm exporterDetails={exporter.exporterDetails} />
            ) : (
              <Text>No se encontraron detalles de la exportadora</Text>
            )}
          </CardBody>
        </Card>
      </Center>
    </Box>
  );
};

export default IsOnboarding(UpdateExporterPage);
