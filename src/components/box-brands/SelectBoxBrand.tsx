import { Box, FormLabel, Input, SimpleGrid } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { PartialBoxBrandType } from './BoxBrandSelectBase';
import InputFieldBoxBrandSelect from './InputFieldBoxBrandSelect';
import InputFieldText from '../ui/form/InputFieldText';

interface SelectBoxBrandProps {
  name: string;
  name2: string;
}

const SelectBoxBrand: React.FC<SelectBoxBrandProps> = ({ name, name2 }) => {
  const [boxBrand, setBoxBrand] = useState<PartialBoxBrandType | null>(null);

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

        <InputFieldText name={name2} label={'Cantidad'} />
      </SimpleGrid>
    </>
  );
};

export default SelectBoxBrand;
