import { Box, FormLabel, Input, SimpleGrid } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { PartialClientType } from './ClientSelectBase';
import InputFieldClientSelect from './InputFieldClientSelect';

interface SelectClientProps {
  name: string;
  harbor?: number;
}

const SelectClient: React.FC<SelectClientProps> = ({ name, harbor }) => {
  const [client, setClient] = useState<PartialClientType | null>(null);

  return (
    <>
      <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
        <InputFieldClientSelect
          name={name}
          label={'Cliente'}
          placeholder={'Seleccione el Cliente'}
          setClient={setClient}
          harbor={harbor}
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
          <Input isReadOnly={true} value={client?.email || ''} />
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
