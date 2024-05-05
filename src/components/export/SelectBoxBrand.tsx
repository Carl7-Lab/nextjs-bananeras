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
import InputFieldText from '../ui/form/InputFieldText';

interface BrandOptionProps {
  id: number;
  name: string;
  brand: string;
  code: string;
}

interface InputFieldSelectorProps {
  name: string;
  name2: string;
  label: string;
  options: BrandOptionProps[];
}

const SelectBoxBrand: React.FC<InputFieldSelectorProps> = ({
  name,
  name2,
  label,
  options,
}) => {
  const [field, meta, helpers] = useField(name);
  const [selectedBrand, setSelectedBrand] = useState<BrandOptionProps | null>(
    null
  );

  const handleBrandChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedBrandId = Number(event.target.value);
    const selectedBrand = options.find((opt) => opt.id === selectedBrandId);
    setSelectedBrand(selectedBrand || null);
    helpers.setValue(selectedBrandId !== 0 ? selectedBrandId : '');
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
            onChange={handleBrandChange}
            value={selectedBrand?.id || ''}
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
          <FormLabel>Marca</FormLabel>
          <Input isReadOnly={true} value={selectedBrand?.brand || ''} />
        </Box>
        <Box>
          <FormLabel>Código</FormLabel>
          <Input isReadOnly={true} value={selectedBrand?.code || ''} />
        </Box>

        <InputFieldText name={name2} label={'Cantidad'} />
      </SimpleGrid>
    </>
  );
};

export default SelectBoxBrand;
