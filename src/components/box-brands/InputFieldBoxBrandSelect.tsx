import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react';
import BoxBrandSelectBase from './BoxBrandSelectBase';
import { BoxBrandType } from '../../types/box-brand/boxBrand';

interface InputFieldBoxBrandSelectProps {
  name: string;
  label: string;
  placeholder: string;
  setBoxBrand?: (brand: Partial<BoxBrandType>) => void;
}

const InputFieldBoxBrandSelect: React.FC<InputFieldBoxBrandSelectProps> = ({
  name,
  label,
  placeholder,
  setBoxBrand,
}) => {
  const [field, meta, helpers] = useField(name);

  return (
    <FormControl id={name} isInvalid={!!meta.error && meta.touched}>
      <FormLabel fontSize='sm' mb='8px'>
        {label}
      </FormLabel>

      <BoxBrandSelectBase
        name={name}
        placeholder={placeholder}
        onChange={(newValue) => helpers.setValue(newValue?.id)}
        field={field}
        setBoxBrand={setBoxBrand}
      />

      {meta.error && meta.touched && (
        <FormErrorMessage mt='8px' mb='16px'>
          {meta.error}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default InputFieldBoxBrandSelect;
