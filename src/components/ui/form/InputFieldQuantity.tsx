import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';
import { useField } from 'formik';
import React, { useEffect } from 'react';

interface InputFieldProps {
  name: string;
  label?: string;
  quantity?: number | '';
  placeholder?: string;
  isReadOnly?: boolean;
  min?: number;
  max?: number;
  step?: number;
  size?: string;
  description?: string;
  flexDirection?: 'column' | 'row';
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
  min = 0,
  max = 10000,
  step = 1,
  flexDirection = 'column',
  size = 'md',
  description,
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
      width={'100%'}
    >
      <Flex flexDirection={flexDirection}>
        {label && (
          <FormLabel fontSize='sm' mb='8px'>
            {label}
          </FormLabel>
        )}
        <NumberInput
          {...field}
          onChange={handleChange}
          isReadOnly={isReadOnly || isBan?.state}
          size={size}
          width={'100%'}
          min={min}
          max={max}
          step={step}
        >
          <NumberInputField
            {...field}
            placeholder={placeholder || label}
            width={'100%'}
          />
        </NumberInput>
      </Flex>
      {meta.error && meta.touched && (
        <FormErrorMessage mt='8px' mb='16px'>
          {meta.error}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default InputFieldQuantity;
