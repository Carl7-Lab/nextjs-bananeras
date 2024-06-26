import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';
import { useField } from 'formik';
import React, { useEffect, useState } from 'react';

interface InputFieldProps {
  name: string;
  label: string;
  quantity?: number | '';
  placeholder?: string;
  isReadOnly?: boolean;
  isBan?: {
    state: boolean;
    setBanState?: () => void;
    firstChange: boolean;
  };
}

const InputFieldQuantity: React.FC<InputFieldProps> = ({
  name,
  label,
  placeholder,
  quantity,
  isReadOnly = false,
  isBan,
}) => {
  const [field, meta, helpers] = useField(name);

  useEffect(() => {
    if (!!quantity) {
      field.value = quantity;
      helpers.setValue(Number(quantity));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity]);

  useEffect(() => {
    if (!!isBan) {
      field.onChange;
      if (isBan.state) {
        field.value = 0;
        helpers.setValue(Number(0));
        if (isBan.firstChange) {
          helpers.setTouched(false);
        }
      } else {
        field.value = '';
        helpers.setValue('');
        if (isBan.firstChange) {
          helpers.setTouched(true);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBan?.state]);

  const handleChange = (valueString: string) => {
    helpers.setValue(Number(valueString));
  };

  return (
    <FormControl
      id={name}
      isInvalid={!!meta.error && meta.touched}
      width={'70%'}
    >
      <FormLabel fontSize='sm' mb='8px'>
        {label}
      </FormLabel>
      <NumberInput
        {...field}
        onChange={handleChange}
        isReadOnly={isReadOnly || isBan?.state}
      >
        <NumberInputField {...field} placeholder={placeholder || label} />
      </NumberInput>
      {meta.error && meta.touched && (
        <FormErrorMessage mt='8px' mb='16px'>
          {meta.error}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default InputFieldQuantity;
