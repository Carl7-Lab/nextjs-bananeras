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

const DetailBusiness = ({
  business,
  width,
}: {
  business: any;
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
              <strong>Ciudad:</strong> {business.city}
            </p>
            <p>
              <strong>Dirección:</strong> {business.address}
            </p>
            <p>
              <strong>Tipo de Fruta:</strong> {business.fruitType}
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
              Geolocalización
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </Heading>
        <AccordionPanel pb={4} pl='60px'>
          <Box>
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
              Códigos
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </Heading>
        <AccordionPanel pb={4} pl='60px'>
          <Box>
            <p>
              <strong>Código MAGAP:</strong> {business.codeMAGAP}
            </p>
            <p>
              <strong>Código Agrocalidad:</strong> {business.codeAGROCALIDAD}
            </p>
          </Box>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default DetailBusiness;
