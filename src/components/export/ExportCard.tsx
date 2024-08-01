import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { ExportType } from '../../types/export';

interface ExportCardProps {
  exportItem: Partial<ExportType>;
  pathname: string;
}

const ExportCard: React.FC<ExportCardProps> = ({ exportItem, pathname }) => {
  const router = useRouter();

  const handleClick = () => {
    // console.log(`export ${exportItem.id}: `, exportItem);
    router.push(`${pathname}/${exportItem.id}`);
  };

  const details = [
    {
      label: 'Tipo de Caja',
      value: `${exportItem.boxBrand?.brand?.name} - ${exportItem.boxBrand?.name}`,
    },
    { label: 'Productor', value: exportItem.merchant?.businessName },
    { label: 'Finca', value: exportItem.business?.name },
    { label: 'Puerto Salida', value: exportItem.harborDeparture?.name },
    { label: 'Puerto Destino', value: exportItem.harborDestination?.name },
    { label: 'Cliente', value: exportItem.client?.businessName },
  ];

  return (
    <Card boxShadow='md' borderRadius='md' width={'350px'}>
      <CardHeader>
        <Heading fontSize={'xl'} fontWeight={'extrabold'} color={'teal.500'}>
          Envío pendiente
        </Heading>
      </CardHeader>
      <CardBody>
        <VStack spacing={4} align='stretch'>
          {details.map((detail, index) => (
            <VStack key={index} spacing={4} align={'stretch'}>
              <Box>
                <Heading fontSize='lg' display='inline-block'>
                  {detail.label}:{' '}
                  <Text
                    as='span'
                    fontSize='md'
                    fontWeight={'normal'}
                    color='gray.600'
                  >
                    {detail.value}
                  </Text>
                </Heading>
              </Box>
              {detail.label === 'Finca' && (
                <VStack align={'stretch'}>
                  <Heading fontSize='lg'>Contactos: </Heading>
                  {exportItem.business?.contacts?.map((contact) => (
                    <VStack key={contact.id} align={'stretch'}>
                      <Text
                        as='span'
                        fontSize='md'
                        fontWeight={'normal'}
                        color='gray.600'
                      >
                        {contact.name} - {contact.phone}
                      </Text>
                    </VStack>
                  ))}
                </VStack>
              )}
            </VStack>
          ))}
        </VStack>
      </CardBody>
      <CardFooter>
        <Button
          w={'100%'}
          colorScheme='teal'
          variant={'outline'}
          onClick={handleClick}
        >
          Realizar envio
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ExportCard;
