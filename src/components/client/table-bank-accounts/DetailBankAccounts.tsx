import {
  Accordion,
  AccordionItem,
  Heading,
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
} from '@chakra-ui/react';

const DetailBankAccounts = ({
  account,
  width,
}: {
  account: {
    merchant?: {
      businessName: string;
      businessId: string;
      city: string;
      address: string;
      email: string;
    };
    client?: {
      businessName: string;
      businessId: string;
      type: string;
      email: string;
      phone: string;
    };
    bank: string;
    owner: string;
    ownerID: string;
    accountNumber: string;
    type: string;
    email: string;
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
              <strong>Banco:</strong> {account.bank}
            </p>
            <p>
              <strong>Tipo de Cuenta:</strong> {account.type}
            </p>
            <p>
              <strong>Número de Cuenta:</strong> {account.accountNumber}
            </p>
            <p>
              <strong>Propietario:</strong> {account.owner}
            </p>
            <p>
              <strong>ID del Propietario:</strong> {account.ownerID}
            </p>
            <p>
              <strong>Correo Electrónico:</strong> {account.email}
            </p>
          </Box>
        </AccordionPanel>
      </AccordionItem>
      {account.merchant ? (
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
                Información del Comerciante
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </Heading>
          <AccordionPanel pb={4} pl='60px'>
            <Box>
              <p>
                <strong>Nombre Comercial:</strong>{' '}
                {account.merchant.businessName}
              </p>
              <p>
                <strong>RUC:</strong> {account.merchant.businessId}
              </p>
              <p>
                <strong>Ciudad:</strong> {account.merchant.city}
              </p>
              <p>
                <strong>Dirección:</strong> {account.merchant.address}
              </p>
              <p>
                <strong>Correo Electrónico:</strong> {account.merchant.email}
              </p>
            </Box>
          </AccordionPanel>
        </AccordionItem>
      ) : (
        account.client && (
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
                  Información del Cliente
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </Heading>
            <AccordionPanel pb={4} pl='60px'>
              <Box>
                <p>
                  <strong>Nombre Comercial:</strong>{' '}
                  {account.client.businessName}
                </p>
                <p>
                  <strong>RUC:</strong> {account.client.businessId}
                </p>
                <p>
                  <strong>Tipo:</strong> {account.client.type}
                </p>
                <p>
                  <strong>Correo Electrónico:</strong> {account.client.email}
                </p>
                <p>
                  <strong>Teléfono:</strong> {account.client.phone}
                </p>
              </Box>
            </AccordionPanel>
          </AccordionItem>
        )
      )}
    </Accordion>
  );
};

export default DetailBankAccounts;
