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

const DetailCuttingSheets = ({
  cuttingSheet,
  width,
}: {
  cuttingSheet: {
    id: number;
    createdAt: string;
    updatedAt: string;
    pdfKey: string;
    palletsHeight: string;
    containerPositioning: string;
    belowDeck: string;
    exportId: number;
    exporterId: number;
    pdfUrl: string;
    export: {
      id: number;
      boxQuantity: number;
      cuttingType: {
        quality: string;
        shipmentType: string;
        leavesAtHarvest: number;
        maxAgeAtCut: number;
        minCaliber: number;
        maxCaliber: number;
        fingerLength: string;
        saneos: string;
        cunas: string;
        clusterDetail: string;
        labelDetail: string;
        packagingPattern: string;
        authorizedTransport: string;
        aliquot: string;
        palletDetail: string;
        cornerProtectorsDetail: string;
        reinforcementsDetail: string;
        plasticStrapsDetail: string;
        staplesDetail: string;
        blockingSheetsDetail: string;
        transportDetail: string;
        generalObservations: string;
      };
      merchant: {
        businessName: string;
      };
      business: {
        name: string;
      };
      harborDeparture: {
        name: string;
      };
      harborDestination: {
        name: string;
      };
      client: {
        businessName: string;
      };
    };
  };
  width: { sm: number; md: number };
}): React.JSX.Element => {
  const { export: ex } = cuttingSheet;

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
              Detalles de Corte
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </Heading>
        <AccordionPanel pb={4} pl='60px'>
          <Box>
            <p>
              <strong>Calidad de Corte:</strong> {ex.cuttingType.quality}
            </p>
            <p>
              <strong>Tipo de Envío:</strong> {ex.cuttingType.shipmentType}
            </p>
            <p>
              <strong>Hojas en Cosecha:</strong>{' '}
              {ex.cuttingType.leavesAtHarvest}
            </p>
            <p>
              <strong>Edad Máxima al Corte:</strong>{' '}
              {ex.cuttingType.maxAgeAtCut}
            </p>
            <p>
              <strong>Calibre Mínimo:</strong> {ex.cuttingType.minCaliber}
            </p>
            <p>
              <strong>Calibre Máximo:</strong> {ex.cuttingType.maxCaliber}
            </p>
            <p>
              <strong>Longitud del Dedo:</strong> {ex.cuttingType.fingerLength}
            </p>
            <p>
              <strong>Patrón de Empaquetado:</strong>{' '}
              {ex.cuttingType.packagingPattern}
            </p>
            <p>
              <strong>Transporte Autorizado:</strong>{' '}
              {ex.cuttingType.authorizedTransport}
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
              Información Logística y Comercial
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </Heading>
        <AccordionPanel pb={4} pl='60px'>
          <Box>
            <p>
              <strong>Productor:</strong> {ex.merchant.businessName}
            </p>
            <p>
              <strong>Finca:</strong> {ex.business.name}
            </p>
            <p>
              <strong>Puerto de Salida:</strong> {ex.harborDeparture.name}
            </p>
            <p>
              <strong>Puerto de Destino:</strong> {ex.harborDestination.name}
            </p>
            <p>
              <strong>Cliente:</strong> {ex.client.businessName}
            </p>
            <p>
              <strong>Acceso al PDF:</strong>{' '}
              <a
                href={cuttingSheet.pdfUrl}
                target='_blank'
                rel='noopener noreferrer'
              >
                Ver PDF
              </a>
            </p>
          </Box>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default DetailCuttingSheets;
