import { Box, FormLabel, Input, SimpleGrid } from '@chakra-ui/react';
import React, { useState } from 'react';
import InputFieldBoxBrandSelect from './InputFieldBoxBrandSelect';
import { BoxBrandType } from '../../types/box-brand/boxBrand';
import InputFieldNumber from '../ui/form/InputFieldNumber';

interface SelectBoxBrandProps {
  name: string;
  name2: string;
}

const SelectBoxBrand: React.FC<SelectBoxBrandProps> = ({ name, name2 }) => {
  const [boxBrand, setBoxBrand] = useState<Partial<BoxBrandType> | null>(null);

  return (
    <>
      <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
        <InputFieldBoxBrandSelect
          name={name}
          label={'Marca de caja'}
          placeholder={'Seleccione la marca'}
          setBoxBrand={setBoxBrand}
        />

        <Box>
          <FormLabel>Código</FormLabel>
          <Input isReadOnly={true} value={boxBrand?.brandCode || ''} />
        </Box>

        <InputFieldNumber name={name2} label={'Cantidad'} />
      </SimpleGrid>
    </>
  );
};

export default SelectBoxBrand;
