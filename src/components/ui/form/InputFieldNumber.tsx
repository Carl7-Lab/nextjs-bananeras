import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';
import { useField } from 'formik';
import React, { useEffect } from 'react';

interface InputFieldProps {
  name: string;
  label?: string;
  value?: number | '';
  placeholder?: string;
  isReadOnly?: boolean;
  isDecimal?: boolean;
  isDolar?: boolean;
  isGeo?: boolean;
  unit?: string;
  size?: string;
}

const InputFieldNumber: React.FC<InputFieldProps> = ({
  name,
  label,
  value = '',
  placeholder,
  isReadOnly = false,
  isDecimal = false,
  isDolar = false,
  isGeo = false,
  unit,
  size = 'md',
}) => {
  const [field, meta, helpers] = useField(name);

  useEffect(() => {
    if (value !== '') {
      let newValue =
        isDecimal || isGeo ? Number(value).toFixed(isGeo ? 6 : 2) : value;
      helpers.setValue(newValue);
    } else {
      helpers.setValue('');
    }
  }, [value]);

  const handleBlur = (event: React.FocusEvent) => {
    field.onBlur(event);
    let newValue =
      isDecimal || isGeo
        ? Number(field.value).toFixed(isGeo ? 6 : 2)
        : field.value;
    helpers.setValue(newValue);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      let newValue =
        isDecimal || isGeo
          ? Number(field.value).toFixed(isGeo ? 6 : 2)
          : field.value;
      helpers.setValue(newValue);
    }
  };

  return (
    <FormControl
      id={name}
      isInvalid={!!meta.error && meta.touched}
      width={'100%'}
    >
      {label && (
        <FormLabel fontSize='sm' mb='8px'>
          {label}
        </FormLabel>
      )}
      <InputGroup width={'100%'}>
        {isDolar && (
          <InputLeftElement
            pointerEvents='none'
            color='gray.400'
            fontSize='1.2em'
          >
            $
          </InputLeftElement>
        )}
        {unit && (
          <InputRightElement
            pointerEvents='none'
            color='gray.500'
            fontSize='1em'
            mr={'8px'}
          >
            {unit}
          </InputRightElement>
        )}
        <NumberInput
          size={size}
          width={'100%'}
          {...field}
          isReadOnly={isReadOnly}
          step={isDecimal || isGeo ? 0.01 : 1}
          min={isGeo ? -180 : undefined}
          max={isGeo ? 180 : undefined}
        >
          <NumberInputField
            {...field}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            placeholder={placeholder || label}
            textAlign={isDecimal && !isGeo ? 'right' : 'left'}
          />
        </NumberInput>
      </InputGroup>
      {meta.error && meta.touched && (
        <FormErrorMessage mt='8px' mb='16px'>
          {meta.error}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default InputFieldNumber;
