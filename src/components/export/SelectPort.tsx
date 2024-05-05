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

interface PortOptionProps {
  id: number;
  country: string;
  name: string;
  city: string;
  transportTime: string;
  latitude: number;
  longitude: number;
}

interface InputFieldSelectorProps {
  name: string;
  label: string;
  options: PortOptionProps[];
}

const SelectPort: React.FC<InputFieldSelectorProps> = ({
  name,
  label,
  options,
}) => {
  const [field, meta, helpers] = useField(name);
  const [selectedPort, setSelectedPort] = useState<PortOptionProps | null>(
    null
  );

  const handlePortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPortId = Number(event.target.value);
    const selectedPort = options.find((opt) => opt.id === selectedPortId);
    setSelectedPort(selectedPort || null);
    helpers.setValue(selectedPortId !== 0 ? selectedPortId : '');
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
            onChange={handlePortChange}
            value={selectedPort?.id || ''}
          >
            <option value={''}>-- Seleccione {label} --</option>
            {options.map((option, index) => (
              <option key={index} value={option.id}>
                {option.name}
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
          <FormLabel>Tiempo de transporte</FormLabel>
          <Input isReadOnly={true} value={selectedPort?.transportTime || ''} />
        </Box>
        <Box>
          <FormLabel>País</FormLabel>
          <Input isReadOnly={true} value={selectedPort?.country || ''} />
        </Box>
        <Box>
          <FormLabel>Latitud</FormLabel>
          <Input isReadOnly={true} value={selectedPort?.latitude || ''} />
        </Box>
        <Box>
          <FormLabel>Ciudad</FormLabel>
          <Input isReadOnly={true} value={selectedPort?.city || ''} />
        </Box>
        <Box>
          <FormLabel>Longitud</FormLabel>
          <Input isReadOnly={true} value={selectedPort?.longitude || ''} />
        </Box>
      </SimpleGrid>
    </>
  );
};

export default SelectPort;
