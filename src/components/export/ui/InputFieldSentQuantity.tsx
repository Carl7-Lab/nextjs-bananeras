import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Input,
} from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react';

interface InputFieldSentQuantityProps {
  name: string;
  material: string;
  materialSelected: string;
  quantity: number;
  placeholder?: string;
}

const InputFieldSentQuantity: React.FC<InputFieldSentQuantityProps> = ({
  name,
  material,
  materialSelected,
  quantity,
  placeholder,
}) => {
  const [field, meta] = useField(name);
  return (
    material !== 'N/A' && (
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
            textAlign='right'
            opacity={0.8}
          />
          <Input
            {...field}
            placeholder={placeholder || material}
            textAlign='right'
          />
          {meta.error && meta.touched && (
            <FormErrorMessage mt='8px' mb='16px'>
              {meta.error}
            </FormErrorMessage>
          )}
        </Grid>
      </FormControl>
    )
  );
};

export default InputFieldSentQuantity;
