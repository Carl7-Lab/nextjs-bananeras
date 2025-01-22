import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputGroup,
  InputLeftElement,
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
  size = 'md',
}) => {
  const [field, meta, helpers] = useField(name);

  useEffect(() => {
    if (value !== '') {
      helpers.setValue(isDecimal ? Number(value).toFixed(2) : value);
    } else {
      helpers.setValue('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleBlur = (event: React.FocusEvent) => {
    field.onBlur(event);

    helpers.setValue(isDecimal ? Number(field.value).toFixed(2) : field.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      helpers.setValue(
        isDecimal ? Number(field.value).toFixed(2) : field.value
      );
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
        <NumberInput
          size={size}
          width={'100%'}
          {...field}
          isReadOnly={isReadOnly}
          step={isDecimal ? 0.01 : 1}
        >
          <NumberInputField
            {...field}
            // value={isDecimal ? Number(field.value).toFixed(2) : field.value}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            placeholder={placeholder || label}
            textAlign={isDecimal ? 'right' : 'left'}
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
