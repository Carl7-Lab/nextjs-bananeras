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

interface ProducerOptionProps {
  id: number;
  businessName: string;
  businessId: string;
  city: string;
  address: string;
}

interface InputFieldSelectorProps {
  name: string;
  label: string;
  options: ProducerOptionProps[];
}

const SelectProducer: React.FC<InputFieldSelectorProps> = ({
  name,
  label,
  options,
}) => {
  const [field, meta, helpers] = useField(name);
  const [selectedProducer, setSelectedProducer] =
    useState<ProducerOptionProps | null>(null);

  const handleProducerChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedProducerId = Number(event.target.value);
    const selectedProducer = options.find(
      (opt) => opt.id === selectedProducerId
    );
    setSelectedProducer(selectedProducer || null);
    helpers.setValue(selectedProducerId !== 0 ? selectedProducerId : '');
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
            onChange={handleProducerChange}
            value={selectedProducer?.id || ''}
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
          <Input isReadOnly={true} value={selectedProducer?.businessId || ''} />
        </Box>
        <Box>
          <FormLabel>Ciudad</FormLabel>
          <Input isReadOnly={true} value={selectedProducer?.city || ''} />
        </Box>
        <Box>
          <FormLabel>Dirección</FormLabel>
          <Input isReadOnly={true} value={selectedProducer?.address || ''} />
        </Box>
      </SimpleGrid>
    </>
  );
};

export default SelectProducer;
