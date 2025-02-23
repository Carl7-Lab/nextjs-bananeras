import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react';
import CuttingTypeSelectBase from './CuttingTypeSelectBase';
import { CuttingType } from '../../../types/cuttingType';

interface InputFieldCuttingTypeSelectProps {
  name: string;
  label: string;
  placeholder: string;
  setCuttingType?: (cuttingType: Partial<CuttingType>) => void;
}

const InputFieldCuttingTypeSelect: React.FC<
  InputFieldCuttingTypeSelectProps
> = ({ name, label, placeholder, setCuttingType }) => {
  const [field, meta, helpers] = useField(name);

  return (
    <FormControl id={name} isInvalid={!!meta.error && meta.touched}>
      <FormLabel fontSize='sm' mb='8px'>
        {label}
      </FormLabel>

      <CuttingTypeSelectBase
        name={name}
        placeholder={placeholder}
        onChange={(newValue) => helpers.setValue(newValue?.id)}
        field={field}
        setCuttingType={setCuttingType}
      />

      {meta.error && meta.touched && (
        <FormErrorMessage mt='8px' mb='16px'>
          {meta.error}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default InputFieldCuttingTypeSelect;
