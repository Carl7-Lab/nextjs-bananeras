import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react';

interface InputFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
}

const InputFieldTextArea: React.FC<InputFieldProps> = ({
  name,
  label,
  placeholder,
}) => {
  const [field, meta, helpers] = useField(name);

  return (
    <FormControl id={name} isInvalid={!!meta.error && meta.touched}>
      {label && (
        <FormLabel fontSize='sm' mb='8px'>
          <Text display='flex' alignItems='center'>
            {label}
          </Text>
        </FormLabel>
      )}
      <Textarea {...field} placeholder={placeholder || label} />
      {meta.error && meta.touched && (
        <FormErrorMessage mt='8px' mb='16px'>
          {meta.error}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default InputFieldTextArea;
