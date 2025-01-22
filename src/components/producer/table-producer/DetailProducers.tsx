import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
  Text,
} from '@chakra-ui/react';
import React from 'react';

const DetailProducers = ({
  business,
  width,
}: {
  business: {
    businessName: string;
    city: string;
    email: string;
    businessId: string;
    address: string;
    contractType: string;
    businesses: {
      id: number;
      name: string;
      city: string;
      address: string;
      fruitType: string;
      area: number;
      latitude: number;
      longitude: number;
      codeMAGAP: string;
      codeAGROCALIDAD: string;
    }[];
    bankAccounts: {
      id: number;
      bank: string;
      owner: string;
      ownerID: string;
      accountNumber: string;
      type: string;
      email: string;
    }[];
  };
  width: { sm: number; md: number };
}) => {
  return (
    <Accordion defaultIndex={[0]} allowMultiple>
      <AccordionItem>
        <Heading>
          <AccordionButton
            pl='60px'
            width={{ sm: `${width.sm}px`, md: `${width.md}px` }}
          >
            <Box flex='1' textAlign='left' fontSize='md' fontWeight='bold'>
              Detalles Generales
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </Heading>
        <AccordionPanel pb={4} pl='60px'>
          <Text>
            <strong>Nombre:</strong> {business.businessName}
          </Text>
          <Text>
            <strong>Ciudad:</strong> {business.city}
          </Text>
          <Text>
            <strong>Correo Electrónico:</strong> {business.email}
          </Text>
          <Text>
            <strong>ID del Negocio:</strong> {business.businessId}
          </Text>
          <Text>
            <strong>Dirección:</strong> {business.address}
          </Text>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <Heading>
          <AccordionButton
            pl='60px'
            width={{ sm: `${width.sm}px`, md: `${width.md}px` }}
          >
            <Box flex='1' textAlign='left' fontSize='md' fontWeight='bold'>
              Contrato
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </Heading>
        <AccordionPanel pb={4} pl='60px'>
          <Text>
            <strong>Tipo de Contrato:</strong> {business.contractType}
          </Text>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <Heading>
          <AccordionButton
            pl='60px'
            width={{ sm: `${width.sm}px`, md: `${width.md}px` }}
          >
            <Box flex='1' textAlign='left' fontSize='md' fontWeight='bold'>
              Fincas Asociadas
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </Heading>
        <AccordionPanel pb={4} pl='60px'>
          {business.businesses.map((biz, index) => (
            <Box key={index} mt={4}>
              <Text>
                <strong>Nombre:</strong> {biz.name}
              </Text>
              <Text>
                <strong>Ciudad:</strong> {biz.city}
              </Text>
              <Text>
                <strong>Dirección:</strong> {biz.address}
              </Text>
              <Text>
                <strong>Tipo de Fruta:</strong> {biz.fruitType}
              </Text>
              <Text>
                <strong>Área:</strong> {biz.area} hectáreas
              </Text>
              <Text>
                <strong>Latitud/Longitud:</strong> {biz.latitude}/
                {biz.longitude}
              </Text>
              <Text>
                <strong>Código MAGAP:</strong> {biz.codeMAGAP}
              </Text>
              <Text>
                <strong>Código AGROCALIDAD:</strong> {biz.codeAGROCALIDAD}
              </Text>
            </Box>
          ))}
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <Heading>
          <AccordionButton
            pl='60px'
            width={{ sm: `${width.sm}px`, md: `${width.md}px` }}
          >
            <Box flex='1' textAlign='left' fontSize='md' fontWeight='bold'>
              Cuentas Bancarias
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </Heading>
        <AccordionPanel pb={4} pl='60px'>
          {business.bankAccounts.map((account, index) => (
            <Box key={index} mt={4}>
              <Text>
                <strong>Banco:</strong> {account.bank}
              </Text>
              <Text>
                <strong>Propietario:</strong> {account.owner}
              </Text>
              <Text>
                <strong>ID Propietario:</strong> {account.ownerID}
              </Text>
              <Text>
                <strong>Número de Cuenta:</strong> {account.accountNumber}
              </Text>
              <Text>
                <strong>Tipo de Cuenta:</strong> {account.type}
              </Text>
              <Text>
                <strong>Email:</strong> {account.email}
              </Text>
            </Box>
          ))}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default DetailProducers;
