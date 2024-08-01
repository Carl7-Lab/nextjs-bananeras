import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import DetailContacts from './DetailContacts';
import DetailProducerPayment from './DetailProducerPayment';
import DetailSupply from './DetailSupply';
import { BoxBrandType } from '../../../types/box-brand/boxBrand';
import { ExportSentType } from '../../../types/exportSent';
import { ContactType } from '../../../types/merchant/contact';
import { ProducerPaymentType } from '../../../types/producerPayment';

const DetailExport = ({
  boxBrand,
  businessContacts,
  supply,
  pendingSent,
  width,
  windowSize,
}: {
  boxBrand: Partial<BoxBrandType>;
  businessContacts: Partial<ContactType>[];
  supply?: Partial<ExportSentType>;
  pendingSent: boolean;
  width: { sm: number; md: number };
  windowSize: { width: number | null; height: number | null };
}) => {
  return (
    <Accordion defaultIndex={[0]} allowMultiple>
      <AccordionItem>
        <Heading>
          <AccordionButton
            pl={'60px'}
            width={{
              sm: Number(width.sm),
              md: Number(width.md),
            }}
          >
            <Box
              as='span'
              flex='1'
              textAlign='left'
              fontSize={'md'}
              fontWeight={'bold'}
            >
              Contactos de la Finca:{' '}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </Heading>
        <AccordionPanel pb={4} pl={'60px'}>
          <DetailContacts businessContacts={businessContacts} width={width} />
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem isDisabled={pendingSent}>
        <Heading>
          <AccordionButton
            pl={'60px'}
            width={{
              sm: Number(width.sm),
              md: Number(width.md),
            }}
          >
            <Box
              as='span'
              flex='1'
              textAlign='left'
              fontSize={'md'}
              fontWeight={'bold'}
            >
              Insumos Enviados: {pendingSent && 'Aun no se realiza el envío'}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </Heading>
        <AccordionPanel pb={4} pl={'60px'}>
          <DetailSupply
            boxBrand={boxBrand}
            supply={supply as Partial<ExportSentType>}
            width={width}
            windowSize={windowSize}
            pendingSent={pendingSent}
          />
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem
        isDisabled={
          (!pendingSent && supply?.pendingProducerPayment) || pendingSent
        }
      >
        <Heading>
          <AccordionButton
            pl={'60px'}
            width={{
              sm: Number(width.sm),
              md: Number(width.md),
            }}
          >
            <Box
              as='span'
              flex='1'
              textAlign='left'
              fontSize={'md'}
              fontWeight={'bold'}
            >
              Pago al Productor:{' '}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </Heading>
        <AccordionPanel pb={4} pl={'60px'}>
          {supply && (
            <DetailProducerPayment
              payment={supply.producerPayment as ProducerPaymentType}
              width={width}
              windowSize={windowSize}
              pendingSent={pendingSent}
              pendingPayment={
                (!pendingSent && supply?.pendingProducerPayment) || pendingSent
              }
            />
          )}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default DetailExport;
