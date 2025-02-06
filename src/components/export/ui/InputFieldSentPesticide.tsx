import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Input,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react';
import { PesticideCocktailPart } from '../../../types/box-brand/post-harvest/pesticideCocktailPart';

interface InputFieldSentPesticideProps {
  name: string;
  pesticideSelected: Partial<PesticideCocktailPart>;
  quantity: number | '';
  placeholder?: string;
  showNumberInput?: boolean;
}

const InputFieldSentPesticide: React.FC<InputFieldSentPesticideProps> = ({
  name,
  pesticideSelected,
  quantity,
  placeholder,
  showNumberInput = true,
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
      <Grid templateColumns='repeat(10, 1fr)' gap={5} alignItems='center'>
        <GridItem colSpan={2}>
          <FormLabel fontSize='sm' m={0} width={'100%'}>
            {`${pesticideSelected.pesticide?.name}: `}
          </FormLabel>
        </GridItem>
        <GridItem colSpan={2}>
          <Input
            name={`${name}.activeIngredient`}
            p={'0px'}
            pl={'8px'}
            value={`${pesticideSelected.pesticide?.activeIngredient}`}
            isReadOnly={true}
            focusBorderColor='gray.200'
            _hover={{ borderColor: 'gray.200' }}
            cursor={'not-allowed'}
            opacity={0.8}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <Input
            name={`${name}.dose`}
            p={'0px'}
            pl={'8px'}
            textAlign={'left'}
            value={`${pesticideSelected.pesticide?.dose}`}
            isReadOnly={true}
            focusBorderColor='gray.200'
            _hover={{ borderColor: 'gray.200' }}
            cursor={'not-allowed'}
            opacity={0.8}
          />
        </GridItem>
        <GridItem colSpan={3}>
          <Input
            name={`${name}.presentation`}
            p={'0px'}
            pl={'8px'}
            value={`${pesticideSelected.pesticide?.presentation}`}
            isReadOnly={true}
            focusBorderColor='gray.200'
            _hover={{ borderColor: 'gray.200' }}
            cursor={'not-allowed'}
            opacity={0.8}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <Input
            name={`${name}.need`}
            value={quantity}
            textAlign={'left'}
            p={'0px'}
            pl={'8px'}
            isReadOnly={true}
            focusBorderColor='gray.200'
            _hover={{ borderColor: 'gray.200' }}
            cursor={'not-allowed'}
            opacity={0.8}
          />
        </GridItem>
        {showNumberInput && (
          <GridItem colSpan={1}>
            <NumberInput {...field}>
              <NumberInputField
                {...field}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                placeholder={placeholder || pesticideSelected.pesticide?.name}
                textAlign='left'
                px={'16px'}
              />
            </NumberInput>
          </GridItem>
        )}
      </Grid>
      {meta.error && meta.touched && (
        <FormErrorMessage mt='8px' mb='16px'>
          {meta.error}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default InputFieldSentPesticide;
