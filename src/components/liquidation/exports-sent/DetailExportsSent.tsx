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
import {
  ExportSentType,
  InsecticideSentPartType,
  PesticideSentPartType,
} from '../../../types/exportSent';

const DetailExportSent = ({
  exportSent,
  width,
}: {
  exportSent: ExportSentType;
  width: { sm: number; md: number };
}) => {
  const { export: ex } = exportSent;

  const renderDetails = (label: string, data?: string) => {
    return data ? `${label}: ${data}` : `${label}: No disponible`;
  };

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
              Información Comercial del Exportador y Comerciante
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </Heading>
        <AccordionPanel pb={4} pl='60px'>
          <Box>
            <p>
              <strong>Nombre del Comerciante:</strong>{' '}
              {ex.merchant?.businessName || 'No disponible'}
            </p>
            <p>
              <strong>RUC:</strong> {ex.merchant?.businessId || 'No disponible'}
            </p>
            <p>
              <strong>Email:</strong> {ex.merchant?.email || 'No disponible'}
            </p>
            <p>
              <strong>Dirección:</strong>{' '}
              {ex.merchant
                ? `${ex.merchant.address}, ${ex.merchant.city}`
                : 'No disponible'}
            </p>
            <p>
              <strong>Tipo de Contrato:</strong>{' '}
              {ex.merchant?.contractType || 'No disponible'}
            </p>
            <p>
              <strong>Detalles del Negocio:</strong>{' '}
              {ex.business
                ? `${ex.business.name}, ${ex.business.city}, ${ex.business.address}`
                : 'No disponible'}
            </p>
            <p>
              <strong>Tipo de Fruta:</strong>{' '}
              {ex.business?.fruitType || 'No disponible'}
            </p>
            <p>
              <strong>Área Cultivada:</strong>{' '}
              {ex.business?.area
                ? `${ex.business.area} hectáreas`
                : 'No disponible'}
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
              Detalles del Producto y Embalaje
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </Heading>
        <AccordionPanel pb={4} pl='60px'>
          <Box>
            <p>
              <strong>Marca de Cajas:</strong>{' '}
              {ex.boxBrand?.name || 'No disponible'}
            </p>
            <p>
              <strong>Código de Marca:</strong>{' '}
              {ex.boxBrand?.brandCode || 'No disponible'}
            </p>
            <p>
              <strong>Cantidad de Cajas:</strong>{' '}
              {ex.boxQuantity || 'No disponible'}
            </p>
            <p>
              <strong>Peso Neto por Caja:</strong>{' '}
              {ex.boxBrand?.netWeightBox
                ? `${ex.boxBrand.netWeightBox} kg`
                : 'No disponible'}
            </p>
            <p>
              <strong>Peso Bruto por Caja:</strong>{' '}
              {ex.boxBrand?.grossWeightBox
                ? `${ex.boxBrand.grossWeightBox} kg`
                : 'No disponible'}
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
              Detalles de Embalaje
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </Heading>
        <AccordionPanel pb={4} pl='60px'>
          <Box>
            <p>
              <strong>Fondo:</strong>{' '}
              {ex.boxBrand?.bottomType
                ? `${ex.boxBrand.bottomType} (Cantidad: ${exportSent.bottomTypeQuantity})`
                : 'No disponible'}
            </p>
            <p>
              <strong>Tapa:</strong>{' '}
              {ex.boxBrand?.lidType
                ? `${ex.boxBrand.lidType} (Cantidad: ${exportSent.lidTypeQuantity})`
                : 'No disponible'}
            </p>
            <p>
              <strong>Funda:</strong>{' '}
              {ex.boxBrand?.coverType
                ? `${ex.boxBrand.coverType} (Cantidad: ${exportSent.coverTypeQuantity})`
                : 'No disponible'}
            </p>
            <p>
              <strong>Cartulina:</strong>{' '}
              {ex.boxBrand?.cardboardType
                ? `${ex.boxBrand.cardboardType} (Cantidad: ${exportSent.cardboardTypeQuantity})`
                : 'No disponible'}
            </p>
            <p>
              <strong>Paraseal:</strong>{' '}
              {ex.boxBrand?.parasealType
                ? `${ex.boxBrand.parasealType} (Cantidad: ${exportSent.parasealTypeQuantity})`
                : 'No disponible'}
            </p>
            <p>
              <strong>Pad:</strong>{' '}
              {ex.boxBrand?.padType
                ? `${ex.boxBrand.padType} (Cantidad: ${exportSent.padTypeQuantity})`
                : 'No disponible'}
            </p>
            <p>
              <strong>Esponja:</strong>{' '}
              {ex.boxBrand?.spongeType
                ? `${ex.boxBrand.spongeType} (Cantidad: ${exportSent.spongeTypeQuantity})`
                : 'No disponible'}
            </p>
            <p>
              <strong>Etiquetas:</strong>{' '}
              {exportSent.labelQuantity
                ? `${exportSent.labelQuantity} unidades`
                : 'No disponible'}
            </p>
            <p>
              <strong>Bandas:</strong>{' '}
              {exportSent.bandQuantity
                ? `${exportSent.bandQuantity} unidades`
                : 'No disponible'}
            </p>
            <p>
              <strong>Sachets:</strong>{' '}
              {exportSent.sachetQuantity
                ? `${exportSent.sachetQuantity} unidades`
                : 'No disponible'}
            </p>
            <p>
              <strong>Gomas:</strong>{' '}
              {exportSent.rubberQuantity
                ? `${exportSent.rubberQuantity} unidades`
                : 'No disponible'}
            </p>
            <p>
              <strong>Protectores:</strong>{' '}
              {exportSent.protectorQuantity
                ? `${exportSent.protectorQuantity} unidades`
                : 'No disponible'}
            </p>
            <p>
              <strong>Bolsas de Racimo:</strong>{' '}
              {exportSent.clusterBagQuantity
                ? `${exportSent.clusterBagQuantity} unidades`
                : 'No disponible'}
            </p>
            <p>
              <strong>Mini Pallets:</strong>{' '}
              {ex.boxBrand?.miniPalletsType
                ? `${ex.boxBrand?.miniPalletsType} (Cantidad: ${exportSent.miniPalletsTypeQuantity})`
                : 'No disponible'}
            </p>
            <p>
              <strong>Esquineros:</strong>{' '}
              {ex.boxBrand?.cornerType
                ? `${ex.boxBrand?.cornerType} (Cantidad: ${exportSent.cornerTypeQuantity})`
                : 'No disponible'}
            </p>
            <p>
              <strong>Refuerzos:</strong>{' '}
              {ex.boxBrand?.reinforcementType
                ? `${ex.boxBrand?.reinforcementType} (Cantidad: ${exportSent.reinforcementTypeQuantity})`
                : 'No disponible'}
            </p>
            <p>
              <strong>Grampas:</strong>{' '}
              {exportSent.stapleQuantity
                ? `${exportSent.stapleQuantity} unidades`
                : 'No disponible'}
            </p>
            <p>
              <strong>Stripping:</strong>{' '}
              {exportSent.strippingQuantity
                ? `${exportSent.strippingQuantity} unidades`
                : 'No disponible'}
            </p>
            <p>
              <strong>Termógrafos:</strong>{' '}
              {exportSent.thermographQuantity
                ? `${exportSent.thermographQuantity} unidades`
                : 'No disponible'}
            </p>
            <p>
              <strong>Sellos:</strong>{' '}
              {exportSent.sealQuantity
                ? `${exportSent.sealQuantity} unidades`
                : 'No disponible'}
            </p>
            <p>
              <strong>Etiquetas Metto:</strong>{' '}
              {exportSent.mettoLabelQuantity
                ? `${exportSent.mettoLabelQuantity} unidades`
                : 'No disponible'}
            </p>
            <p>
              <strong>Cinta de Embalar:</strong>{' '}
              {ex.boxBrand?.packingTapeType
                ? `${ex.boxBrand?.packingTapeType} (Cantidad: ${exportSent.packingTapeTypeQuantity})`
                : 'No disponible'}
            </p>
            <p>
              <strong>Removedor de Látex:</strong>{' '}
              {exportSent.latexRemoverQuantity
                ? `${exportSent.latexRemoverQuantity} unidades`
                : 'No disponible'}
            </p>
            <p>
              <strong>Hojas de Bloqueo:</strong>{' '}
              {exportSent.blockingSheetQuantity
                ? `${exportSent.blockingSheetQuantity} unidades`
                : 'No disponible'}
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
              Logística de Envío
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </Heading>
        <AccordionPanel pb={4} pl='60px'>
          <Box>
            <p>
              <strong>Puerto de Salida:</strong>
              {ex.harborDeparture
                ? `${ex.harborDeparture.name}, ${ex.harborDeparture.city}, ${ex.harborDeparture.country}`
                : 'No disponible'}
            </p>
            <p>
              <strong>Puerto de Destino:</strong>
              {ex.harborDestination
                ? `${ex.harborDestination.name}, ${ex.harborDestination.city}, ${ex.harborDestination.country}`
                : 'No disponible'}
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
              Control de Calidad y Seguridad
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </Heading>
        <AccordionPanel pb={4} pl='60px'>
          <Box>
            {exportSent.pesticideSent && exportSent.pesticideSent.length > 0 ? (
              <p>
                <strong>Pesticidas:</strong>
                {exportSent.pesticideSent
                  .map((pest: Partial<PesticideSentPartType>) =>
                    pest.pesticide && pest.quantity
                      ? `${pest.pesticide.name} (${pest.quantity} unidades)`
                      : 'Información incompleta'
                  )
                  .join(', ')}
              </p>
            ) : (
              <p>
                <strong>Pesticidas:</strong> No disponible
              </p>
            )}
            {exportSent.insecticideSent &&
            exportSent.insecticideSent.length > 0 ? (
              <p>
                <strong>Insecticidas:</strong>
                {exportSent.insecticideSent
                  .map((insect: Partial<InsecticideSentPartType>) =>
                    insect.insecticide && insect.quantity
                      ? `${insect.insecticide.name} (${insect.quantity} unidades)`
                      : 'Información incompleta'
                  )
                  .join(', ')}
              </p>
            ) : (
              <p>
                <strong>Insecticidas:</strong> No disponible
              </p>
            )}
          </Box>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default DetailExportSent;
