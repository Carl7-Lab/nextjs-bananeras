import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputRightElement,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react';

interface InputFieldSentQuantityProps {
  name: string;
  material: string;
  materialSelected: string;
  quantity: number | '';
  unit?: string;
  placeholder?: string;
}

const InputFieldSentQuantity: React.FC<InputFieldSentQuantityProps> = ({
  name,
  material,
  materialSelected,
  quantity,
  unit,
  placeholder,
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
    materialSelected !== 'N/A' && (
      <FormControl id={name} isInvalid={!!meta.error && meta.touched}>
        <Grid templateColumns='repeat(5, 1fr)' gap={1} alignItems='center'>
          <GridItem colSpan={1}>
            <FormLabel fontSize='sm' m={0} width={'100%'}>
              {material}:
            </FormLabel>
          </GridItem>
          <GridItem colSpan={2}>
            <Input
              name={materialSelected}
              id={materialSelected}
              value={materialSelected}
              isReadOnly={true}
              focusBorderColor='gray.200'
              _hover={{ borderColor: 'gray.200' }}
              cursor={'not-allowed'}
              // textAlign='right'
              opacity={0.8}
            />
          </GridItem>
          <Input
            name={`${name} need`}
            id={`${name} need`}
            value={quantity}
            isReadOnly={true}
            focusBorderColor='gray.200'
            _hover={{ borderColor: 'gray.200' }}
            cursor={'not-allowed'}
            textAlign='left'
            opacity={0.8}
          />
          <InputGroup width={'100%'}>
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

            <NumberInput {...field}>
              <NumberInputField
                {...field}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                placeholder={placeholder || material}
                textAlign='left'
                px={'16px'}
              />
            </NumberInput>
          </InputGroup>
        </Grid>
        {meta.error && meta.touched && (
          <FormErrorMessage mt='8px' mb='16px'>
            {meta.error}
          </FormErrorMessage>
        )}
      </FormControl>
    )
  );
};

export default InputFieldSentQuantity;
