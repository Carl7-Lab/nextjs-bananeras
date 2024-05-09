import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react';
import HarborSelectBase, { PartialHarborType } from './HarborSelectBase';

interface InputFieldHarborSelectProps {
  name: string;
  label: string;
  placeholder: string;
  setHarbor?: (harbor: PartialHarborType) => void;
}

const InputFieldHarborSelect: React.FC<InputFieldHarborSelectProps> = ({
  name,
  label,
  placeholder,
  setHarbor,
}) => {
  const [field, meta, helpers] = useField(name);

  return (
    <FormControl id={name} isInvalid={!!meta.error && meta.touched}>
      <FormLabel fontSize='sm' mb='8px'>
        {label}
      </FormLabel>

      <HarborSelectBase
        name={name}
        placeholder={placeholder}
        onChange={(newValue) => helpers.setValue(newValue?.id)}
        field={field}
        setHarbor={setHarbor}
      />

      {meta.error && meta.touched && (
        <FormErrorMessage mt='8px' mb='16px'>
          {meta.error}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default InputFieldHarborSelect;
