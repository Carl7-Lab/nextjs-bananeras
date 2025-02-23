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

const DetailCuttingTypes = ({
  cuttingType,
  width,
}: {
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
    firstLine?: string;
    secondLine?: string;
    thirdLine?: string;
    fourthLine?: string;
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
    generalObservations?: string;
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
              <strong>Calidad:</strong> {cuttingType.quality}
            </p>
            <p>
              <strong>Tipo de Envío:</strong> {cuttingType.shipmentType}
            </p>
            <p>
              <strong>Hojas en Cosecha:</strong> {cuttingType.leavesAtHarvest}
            </p>
            <p>
              <strong>Edad Máxima al Corte:</strong> {cuttingType.maxAgeAtCut}
            </p>
            <p>
              <strong>Calibre Mínimo:</strong> {cuttingType.minCaliber}
            </p>
            <p>
              <strong>Calibre Máximo:</strong> {cuttingType.maxCaliber}
            </p>
            <p>
              <strong>Longitud del Dedo:</strong> {cuttingType.fingerLength}
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
              Transporte y Observaciones
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </Heading>
        <AccordionPanel pb={4} pl='60px'>
          <Box>
            <p>
              <strong>Detalle del Racimo:</strong> {cuttingType.clusterDetail}
            </p>
            <p>
              <strong>Detalle de la Etiqueta:</strong> {cuttingType.labelDetail}
            </p>
            <p>
              <strong>Primera Línea:</strong> {cuttingType.firstLine || 'N/A'}
            </p>
            <p>
              <strong>Segunda Línea:</strong> {cuttingType.secondLine || 'N/A'}
            </p>
            <p>
              <strong>Tercera Línea:</strong> {cuttingType.thirdLine || 'N/A'}
            </p>
            <p>
              <strong>Cuarta Línea:</strong> {cuttingType.fourthLine || 'N/A'}
            </p>
            <p>
              <strong>Patrón de Empaquetado:</strong>{' '}
              {cuttingType.packagingPattern}
            </p>
            <p>
              <strong>Transporte Autorizado:</strong>{' '}
              {cuttingType.authorizedTransport}
            </p>
            <p>
              <strong>Alícuota:</strong> {cuttingType.aliquot}
            </p>
            <p>
              <strong>Detalle de Pallet:</strong> {cuttingType.palletDetail}
            </p>
            <p>
              <strong>Esquineros:</strong> {cuttingType.cornerProtectorsDetail}
            </p>
            <p>
              <strong>Refuerzos:</strong> {cuttingType.reinforcementsDetail}
            </p>
            <p>
              <strong>Cintas Plásticas:</strong>{' '}
              {cuttingType.plasticStrapsDetail}
            </p>
            <p>
              <strong>Grapas:</strong> {cuttingType.staplesDetail}
            </p>
            <p>
              <strong>Hojas de Bloqueo:</strong>{' '}
              {cuttingType.blockingSheetsDetail}
            </p>
            <p>
              <strong>Detalle de Transporte:</strong>{' '}
              {cuttingType.transportDetail}
            </p>
            <p>
              <strong>Observaciones Generales:</strong>{' '}
              {cuttingType.generalObservations || 'Sin observaciones'}
            </p>
          </Box>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default DetailCuttingTypes;
