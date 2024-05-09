import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
} from '@chakra-ui/react';
import { useField } from 'formik';
import React, { useEffect, useState } from 'react';
import { PartialClientType } from '../client/ClientSelectBase';
import InputFieldClientSelect from '../client/InputFieldClientSelect';

interface InputFieldSelectorProps {
  name: string;
}

const SelectClient: React.FC<InputFieldSelectorProps> = ({ name }) => {
  const [client, setClient] = useState<PartialClientType | null>(null);

  // useEffect(() => {
  //   console.log('client SelectClient: ', client);
  // }, [client]);

  return (
    <>
      <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
        <InputFieldClientSelect
          name={name}
          label={'Cliente'}
          placeholder={'Seleccione el Cliente'}
          setClient={setClient}
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
