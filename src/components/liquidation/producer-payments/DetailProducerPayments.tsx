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

const DetailProducerPayments = ({
  producerPayment,
  width,
}: {
  producerPayment: {
    id: number;
    merchant: {
      businessName: string;
      businessId: string;
      contractType: string;
      email: string;
    };
    harborDeparture: {
      name: string;
      country: string;
      city: string;
    };
    harborDestination: {
      name: string;
      country: string;
      city: string;
    };
    boxBrand: {
      name: string;
      brandCode: string;
      netWeightBox: number;
      grossWeightBox: number;
    };
    boxQuantity: number;
    price: string;
    subtotal1: string;
    transport: string;
    materials: string;
    others: string;
    total: string;
    transferUrl: string;
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
              Detalles del Productor
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </Heading>
        <AccordionPanel pb={4} pl='60px'>
          <Box>
            <p>
              <strong>Nombre del Productor:</strong>{' '}
              {producerPayment.merchant.businessName}
            </p>
            <p>
              <strong>RUC del Productor:</strong>{' '}
              {producerPayment.merchant.businessId}
            </p>
            <p>
              <strong>Tipo de Contrato:</strong>{' '}
              {producerPayment.merchant.contractType}
            </p>
            <p>
              <strong>Email del Productor:</strong>{' '}
              {producerPayment.merchant.email}
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
              Información Logística
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </Heading>
        <AccordionPanel pb={4} pl='60px'>
          <Box>
            <p>
              <strong>Puerto de Salida:</strong>{' '}
              {producerPayment.harborDeparture.name} (
              {producerPayment.harborDeparture.city},{' '}
              {producerPayment.harborDeparture.country})
            </p>
            <p>
              <strong>Puerto de Destino:</strong>{' '}
              {producerPayment.harborDestination.name} (
              {producerPayment.harborDestination.city},{' '}
              {producerPayment.harborDestination.country})
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
              Detalles Financieros
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </Heading>
        <AccordionPanel pb={4} pl='60px'>
          <Box>
            <p>
              <strong>Cantidad de Cajas:</strong> {producerPayment.boxQuantity}
            </p>
            <p>
              <strong>Marca y Código de Caja:</strong>{' '}
              {producerPayment.boxBrand.name} -{' '}
              {producerPayment.boxBrand.brandCode}
            </p>
            <p>
              <strong>Peso Neto de Caja:</strong>{' '}
              {producerPayment.boxBrand.netWeightBox} LBS
            </p>
            <p>
              <strong>Peso Bruto de Caja:</strong>{' '}
              {producerPayment.boxBrand.grossWeightBox} LBS
            </p>
            <p>
              <strong>Precio Unitario:</strong> ${producerPayment.price}
            </p>
            <p>
              <strong>Subtotal Inicial:</strong> ${producerPayment.subtotal1}
            </p>
            <p>
              <strong>Costo de Transporte:</strong> ${producerPayment.transport}
            </p>
            <p>
              <strong>Costo de Materiales:</strong> ${producerPayment.materials}
            </p>
            <p>
              <strong>Otros Costos:</strong> ${producerPayment.others}
            </p>
            <p>
              <strong>Total a Pagar:</strong> ${producerPayment.total}
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
              Transferencia
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </Heading>
        <AccordionPanel pb={4} pl='60px'>
          <Box>
            <p>
              <strong>Acceso:</strong>
              <a
                href={producerPayment.transferUrl}
                target='_blank'
                rel='noopener noreferrer'
              >
                {' '}
                Ver Evidencia
              </a>
            </p>
          </Box>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default DetailProducerPayments;
