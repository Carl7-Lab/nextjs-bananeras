import { Box, FormLabel, Input, SimpleGrid } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import InputFieldClientSelect from './InputFieldClientSelect';
import { ClientType } from '../../types/client';

interface SelectClientProps {
  name: string;
  harbor?: number;
  isHarbor?: boolean;
  clientSelect?: Partial<ClientType>;
  setClientSelect?: (client: Partial<ClientType> | null) => void;
}

const SelectClient: React.FC<SelectClientProps> = ({
  name,
  harbor,
  isHarbor,
  clientSelect,
  setClientSelect,
}) => {
  const [client, setClient] = useState<Partial<ClientType> | null>(null);

  useEffect(() => {
    if (!!clientSelect) {
      setClient(clientSelect);
    }
  }, [clientSelect]);

  useEffect(() => {
    if (!!setClientSelect) {
      setClientSelect(client);
    }
  }, [client, setClientSelect]);

  return (
    <>
      <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
        <InputFieldClientSelect
          name={name}
          label={'Cliente'}
          placeholder={'Seleccione el Cliente'}
          setClient={setClient}
          harbor={harbor}
          isHarbor={isHarbor}
        />

        <Box>
          <FormLabel>RUC</FormLabel>
          <Input isReadOnly={true} value={client?.businessId || ''} />
        </Box>
        <Box>
          <FormLabel>Tipo</FormLabel>
          <Input isReadOnly={true} value={client?.type || ''} />
        </Box>
        <Box>
          <FormLabel>Correo</FormLabel>
          <Input
            isReadOnly={true}
            value={client?.email || ''}
            placeholder={client ? 'No se ha agregado información' : ''}
          />
        </Box>
        <Box>
          <FormLabel>Teléfono</FormLabel>
          <Input isReadOnly={true} value={client?.phone || ''} />
        </Box>
      </SimpleGrid>
    </>
  );
};

export default SelectClient;
