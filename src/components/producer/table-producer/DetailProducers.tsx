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
    businesses: { id: number }[];
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
              <strong>Ciudad:</strong> {business.city}
            </p>
            <p>
              <strong>Correo Electrónico:</strong> {business.email}
            </p>
            <p>
              <strong>ID del Negocio:</strong> {business.businessId}
            </p>
            <p>
              <strong>Dirección:</strong> {business.address}
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
              Contrato
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </Heading>
        <AccordionPanel pb={4} pl='60px'>
          <Box>
            <p>
              <strong>Tipo de Contrato:</strong> {business.contractType}
            </p>
          </Box>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default DetailProducers;
