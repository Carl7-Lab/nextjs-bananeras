import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react';

interface InputFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  isReadOnly?: boolean;
}

const InputFieldNumber: React.FC<InputFieldProps> = ({
  name,
  label,
  placeholder,
  isReadOnly = false,
}) => {
  const [field, meta, helpers] = useField(name);

  const handleBlur = (event: React.FocusEvent) => {
    field.onBlur(event);

    helpers.setValue(Number(meta.value));
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      helpers.setValue(Number(field.value));
    }
  };

  return (
    <FormControl id={name} isInvalid={!!meta.error && meta.touched}>
      {label && (
        <FormLabel fontSize='sm' mb='8px'>
          {label}
        </FormLabel>
      )}
      <NumberInput {...field} isReadOnly={isReadOnly}>
        <NumberInputField
          {...field}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || label}
        />
      </NumberInput>
      {meta.error && meta.touched && (
        <FormErrorMessage mt='8px' mb='16px'>
          {meta.error}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default InputFieldNumber;
