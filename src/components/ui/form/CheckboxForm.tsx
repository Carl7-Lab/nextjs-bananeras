import {
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react';

interface CheckboxProps {
  name: string;
  label: string;
}

const CheckboxForm: React.FC<CheckboxProps> = ({ name, label }) => {
  const [field, meta] = useField(name);
  return (
    <FormControl id={name} isInvalid={!!meta.error && meta.touched} mt='10px'>
      <Checkbox {...field}>{label}</Checkbox>
      {meta.error && meta.touched && (
        <FormErrorMessage mt='8px' mb='16px'>
          {meta.error}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default CheckboxForm;
