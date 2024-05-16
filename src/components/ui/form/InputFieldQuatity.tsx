import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react';

interface InputFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  isReadOnly?: boolean;
}

const InputFieldQuatity: React.FC<InputFieldProps> = ({
  name,
  label,
  placeholder,
  isReadOnly = false,
}) => {
  const [field, meta] = useField(name);

  return (
    <FormControl
      id={name}
      isInvalid={!!meta.error && meta.touched}
      width={'70%'}
    >
      <FormLabel fontSize='sm' mb='8px'>
        {label}
      </FormLabel>
      <Input
        isReadOnly={isReadOnly}
        {...field}
        placeholder={placeholder || label}
      />
      {meta.error && meta.touched && (
        <FormErrorMessage mt='8px' mb='16px'>
          {meta.error}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default InputFieldQuatity;
