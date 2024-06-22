import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react';

interface InputFieldDateProps {
  name: string;
  label?: string;
  placeholder?: string;
}

const InputFieldDate: React.FC<InputFieldDateProps> = ({
  name,
  label,
  placeholder,
}) => {
  const [field, meta] = useField(name);
  return (
    <FormControl id={name} isInvalid={!!meta.error && meta.touched}>
      {label && (
        <FormLabel fontSize='sm' mb='8px'>
          {label}
        </FormLabel>
      )}
      <Input {...field} placeholder={placeholder || label} type={'date'} />

      {meta.error && meta.touched && (
        <FormErrorMessage mt='8px' mb='16px'>
          {meta.error}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default InputFieldDate;
