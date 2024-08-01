import { Box, Button, FormLabel, Input, SimpleGrid } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import InputFieldPesticideSelect from './InputFieldPesticideSelect';
import { PesticideType } from '../../../../types/box-brand/post-harvest/pesticide';
import InputFieldQuantity from '../../../ui/form/InputFieldQuantity';

interface SelectPesticideProps {
  name1: string;
  name2: string;
  isDisabledRemove?: boolean;
  pesticideSelect?: Partial<PesticideType>;
  setPesticideSelect?: (pesticide: Partial<PesticideType> | null) => void;
  onClickRemove?: () => void;
}

const SelectPesticide: React.FC<SelectPesticideProps> = ({
  name1,
  name2,
  isDisabledRemove,
  pesticideSelect,
  setPesticideSelect,
  onClickRemove,
}) => {
  const [pesticide, setPesticide] = useState<Partial<PesticideType> | null>(
    null
  );

  useEffect(() => {
    if (!!pesticideSelect) {
      setPesticide(pesticideSelect);
    }
  }, [pesticideSelect]);

  useEffect(() => {
    if (!!setPesticideSelect) {
      setPesticideSelect(pesticide);
    }
  }, [pesticide, setPesticideSelect]);

  return (
    <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
      <InputFieldPesticideSelect
        name={name1}
        label={'Agroquímico'}
        placeholder={'Seleccione el pesticida'}
        setPesticide={setPesticide}
      />

      <Box>
        <FormLabel>Ingrediente Activo</FormLabel>
        <Input
          isReadOnly={true}
          value={pesticide?.activeIngredient || ''}
          placeholder={'Ingrediente Activo'}
        />
      </Box>
      <Box>
        <FormLabel>Presentación</FormLabel>
        <Input
          isReadOnly={true}
          value={pesticide?.presentation || ''}
          placeholder='Presentación'
        />
      </Box>
      <Box>
        <FormLabel>Dosis</FormLabel>
        <Input
          isReadOnly={true}
          value={pesticide?.dose || ''}
          placeholder={'Dosis'}
        />
      </Box>

      <InputFieldQuantity name={name2} label={'Cantidad'} />

      <Box display='flex' alignItems='flex-end'>
        <Button
          variant='solid'
          colorScheme='red'
          isDisabled={isDisabledRemove}
          onClick={onClickRemove}
          width={'100%'}
        >
          Eliminar Pesticida
        </Button>
      </Box>
    </SimpleGrid>
  );
};

export default SelectPesticide;
