import { Box, Button, FormLabel, Input, SimpleGrid } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import InputFieldInsecticideSelect from './InputFieldInsecticideSelect';
import { InsecticideType } from '../../../../types/box-brand/additions/insecticide';
import InputFieldQuantity from '../../../ui/form/InputFieldQuantity';

interface SelectInsecticideProps {
  name1: string;
  name2: string;
  isDisabledRemove?: boolean;
  insecticideSelect?: Partial<InsecticideType>;
  setInsecticideSelect?: (insecticide: Partial<InsecticideType> | null) => void;
  onClickRemove?: () => void;
}

const SelectInsecticide: React.FC<SelectInsecticideProps> = ({
  name1,
  name2,
  isDisabledRemove,
  insecticideSelect,
  setInsecticideSelect,
  onClickRemove,
}) => {
  const [insecticide, setInsecticide] =
    useState<Partial<InsecticideType> | null>(null);

  useEffect(() => {
    if (!!insecticideSelect) {
      setInsecticide(insecticideSelect);
    }
  }, [insecticideSelect]);

  useEffect(() => {
    if (!!setInsecticideSelect) {
      setInsecticideSelect(insecticide);
    }
  }, [insecticide, setInsecticideSelect]);

  return (
    <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
      <InputFieldInsecticideSelect
        name={name1}
        label={'Insecticida'}
        placeholder={'Seleccione el insecticida'}
        setInsecticide={setInsecticide}
      />

      <Box>
        <FormLabel>Ingrediente Activo</FormLabel>
        <Input
          isReadOnly={true}
          value={insecticide?.activeIngredient || ''}
          placeholder={'Ingrediente Activo'}
        />
      </Box>
      <Box>
        <FormLabel>Dosis</FormLabel>
        <Input
          isReadOnly={true}
          value={insecticide?.dose || ''}
          placeholder={'Dosis'}
        />
      </Box>

      <InputFieldQuantity name={name2} label={'Cantidad'} />

      <Box></Box>

      <Box display='flex' alignItems='flex-end'>
        <Button
          variant='solid'
          colorScheme='red'
          isDisabled={isDisabledRemove}
          onClick={onClickRemove}
          width={'100%'}
        >
          Eliminar Insecticida
        </Button>
      </Box>
    </SimpleGrid>
  );
};

export default SelectInsecticide;
