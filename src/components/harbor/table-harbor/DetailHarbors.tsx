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

const DetailHarbors = ({
  business,
  width,
}: {
  business: {
    name: string;
    country: string;
    city: string;
    type: string;
    latitude: number;
    longitude: number;
    clients: {
      id: number;
      businessName: string;
      businessId: string;
      type: string;
      email: string;
      phone: string;
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
              Detalles del Puerto
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </Heading>
        <AccordionPanel pb={4} pl='60px'>
          <Box>
            <p>
              <strong>Nombre:</strong> {business.name}
            </p>
            <p>
              <strong>País:</strong> {business.country}
            </p>
            <p>
              <strong>Ciudad:</strong> {business.city}
            </p>
            <p>
              <strong>Tipo:</strong> {business.type}
            </p>
            <p>
              <strong>Latitud:</strong> {business.latitude}
            </p>
            <p>
              <strong>Longitud:</strong> {business.longitude}
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
              Clientes
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </Heading>
        <AccordionPanel pb={4} pl='60px'>
          <Box>
            {business.clients.map((client) => (
              <Box key={client.id} mb={4}>
                <p>
                  <strong>Nombre:</strong> {client.businessName}
                </p>
                <p>
                  <strong>RUC:</strong> {client.businessId}
                </p>
                <p>
                  <strong>Tipo:</strong> {client.type}
                </p>
                <p>
                  <strong>Correo Electrónico:</strong> {client.email}
                </p>
                <p>
                  <strong>Teléfono:</strong> {client.phone}
                </p>
              </Box>
            ))}
          </Box>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default DetailHarbors;
