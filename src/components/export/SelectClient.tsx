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
import React, { useState } from 'react';

interface ClientOptionProps {
  id: number;
  businessName: string;
  businessId: string;
  type: string;
  email: string;
  phone: string;
}

interface InputFieldSelectorProps {
  name: string;
  label: string;
  options: ClientOptionProps[];
}

const SelectClient: React.FC<InputFieldSelectorProps> = ({
  name,
  label,
  options,
}) => {
  const [field, meta, helpers] = useField(name);
  const [selectedClient, setSelectedClient] =
    useState<ClientOptionProps | null>(null);

  const handleClientChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedClientId = Number(event.target.value);
    const selectedClient = options.find((opt) => opt.id === selectedClientId);
    setSelectedClient(selectedClient || null);
    helpers.setValue(selectedClientId !== 0 ? selectedClientId : '');
  };
  return (
    <>
      <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
        <FormControl id={name} isInvalid={!!meta.error && meta.touched}>
          <FormLabel fontSize='sm' mb='8px'>
            {label}
          </FormLabel>
          <Select
            {...field}
            onChange={handleClientChange}
            value={selectedClient?.id || ''}
          >
            <option value={''}>-- Seleccione {label} --</option>
            {options.map((option, index) => (
              <option key={index} value={option.id}>
                {option.businessName}
              </option>
            ))}
          </Select>
          {meta.error && meta.touched && (
            <FormErrorMessage mt='8px' mb='16px'>
              {meta.error}
            </FormErrorMessage>
          )}
        </FormControl>

        <Box>
          <FormLabel>RUC</FormLabel>
          <Input isReadOnly={true} value={selectedClient?.businessId || ''} />
        </Box>
        <Box>
          <FormLabel>Tipo</FormLabel>
          <Input isReadOnly={true} value={selectedClient?.type || ''} />
        </Box>
        <Box>
          <FormLabel>Correo</FormLabel>
          <Input isReadOnly={true} value={selectedClient?.email || ''} />
        </Box>
        <Box>
          <FormLabel>Teléfono</FormLabel>
          <Input isReadOnly={true} value={selectedClient?.phone || ''} />
        </Box>
      </SimpleGrid>
    </>
  );
};

export default SelectClient;
