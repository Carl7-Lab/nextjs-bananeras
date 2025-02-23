import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
} from '@chakra-ui/react';
import React from 'react';

const DetailClients = ({
  business,
  width,
}: {
  business: {
    businessName: string;
    businessId: string;
    type: string;
    email: string;
    phone: string;
    harbors: {
      id: number;
      name: string;
      country: string;
      city: string;
      latitude: number;
      longitude: number;
    }[];
    shippingCompanies: {
      id: number;
      name: string;
      estDuration: string;
    }[];
  };
  width: { sm: number; md: number };
}): React.JSX.Element => {
  return (
    <Accordion defaultIndex={[0]} allowMultiple>
      <AccordionItem>
        <Heading>
          <AccordionButton
            pl='60px'
            width={{
              sm: Number(width.sm),
              md: Number(width.md),
            }}
          >
            <Box
              as='span'
              flex='1'
              textAlign='left'
              fontSize='md'
              fontWeight='bold'
            >
              Detalles Generales
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </Heading>
        <AccordionPanel pb={4} pl='60px'>
          <Box>
            <p>
              <strong>Nombre:</strong> {business.businessName}
            </p>
            <p>
              <strong>RUC:</strong> {business.businessId}
            </p>
            <p>
              <strong>Tipo:</strong> {business.type}
            </p>
            <p>
              <strong>Correo Electrónico:</strong> {business.email}
            </p>
            <p>
              <strong>Teléfono:</strong> {business.phone}
            </p>
          </Box>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <Heading>
          <AccordionButton
            pl='60px'
            width={{
              sm: Number(width.sm),
              md: Number(width.md),
            }}
          >
            <Box
              as='span'
              flex='1'
              textAlign='left'
              fontSize='md'
              fontWeight='bold'
            >
              Puertos
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </Heading>
        <AccordionPanel pb={4} pl='60px'>
          <Box>
            {business.harbors.map((harbor) => (
              <Box key={harbor.id} mb={4}>
                <p>
                  <strong>Nombre:</strong> {harbor.name}
                </p>
                <p>
                  <strong>País:</strong> {harbor.country}
                </p>
                <p>
                  <strong>Ciudad:</strong> {harbor.city}
                </p>
                <p>
                  <strong>Latitud:</strong> {harbor.latitude}
                </p>
                <p>
                  <strong>Longitud:</strong> {harbor.longitude}
                </p>
              </Box>
            ))}
          </Box>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <Heading>
          <AccordionButton
            pl='60px'
            width={{
              sm: Number(width.sm),
              md: Number(width.md),
            }}
          >
            <Box
              as='span'
              flex='1'
              textAlign='left'
              fontSize='md'
              fontWeight='bold'
            >
              Compañías de Envío
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </Heading>
        <AccordionPanel pb={4} pl='60px'>
          <Box>
            {business.shippingCompanies.map((company) => (
              <Box key={company.id} mb={4}>
                <p>
                  <strong>Nombre:</strong> {company.name}
                </p>
                <p>
                  <strong>Duración Estimada:</strong> {company.estDuration}
                </p>
              </Box>
            ))}
          </Box>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default DetailClients;
