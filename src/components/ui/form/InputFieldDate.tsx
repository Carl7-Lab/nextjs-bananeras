import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { useField } from 'formik';
import React, { useEffect, useState } from 'react';

interface InputFieldDateProps {
  name: string;
  label?: string;
  placeholder?: string;
  flexDirection?: 'column' | 'row';
  isReadOnly?: boolean;
}

const InputFieldDate: React.FC<InputFieldDateProps> = ({
  name,
  label,
  placeholder,
  flexDirection = 'column',
  isReadOnly = false,
}) => {
  const [field, meta, helpers] = useField(name);

  const formatDate = (date: Date): string => date.toISOString().split('T')[0];

  const [dateValue, setDateValue] = useState<string>(
    field.value ? formatDate(new Date(field.value)) : ''
  );

  useEffect(() => {
    if (field.value) {
      const adjustedDate = new Date(field.value);
      adjustedDate.setMinutes(
        adjustedDate.getMinutes() - adjustedDate.getTimezoneOffset()
      );
      setDateValue(formatDate(adjustedDate));
    } else {
      setDateValue('');
    }
  }, [field.value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value) {
      const newDate = new Date(e.target.value);
      newDate.setMinutes(newDate.getMinutes() + newDate.getTimezoneOffset());
      helpers.setValue(newDate.toISOString());
      setDateValue(e.target.value);
    } else {
      helpers.setValue('');
      setDateValue('');
    }
  };

  return (
    <FormControl id={name} isInvalid={!!meta.error && meta.touched}>
      <Flex flexDirection={flexDirection}>
        {label && (
          <FormLabel fontSize='sm' mb='8px'>
            {label}
          </FormLabel>
        )}
        <Input
          {...field}
          value={dateValue}
          onChange={handleChange}
          placeholder={placeholder || label}
          type={'date'}
          isReadOnly={isReadOnly}
        />

        {meta.error && meta.touched && (
          <FormErrorMessage mt='8px' mb='16px'>
            {meta.error}
          </FormErrorMessage>
        )}
      </Flex>
    </FormControl>
  );
};

export default InputFieldDate;
