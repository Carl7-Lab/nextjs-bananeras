import { Box, FormLabel, Input, SimpleGrid } from '@chakra-ui/react';
import React, { useState } from 'react';
import { PartialBoxBrandType } from '../box-brands/BoxBrandSelectBase';
import InputFieldBoxBrandSelect from '../box-brands/InputFieldBoxBrandSelect';
import InputFieldText from '../ui/form/InputFieldText';

interface SelectBoxBrand2Props {
  name: string;
  name2: string;
}

const SelectBoxBrand2: React.FC<SelectBoxBrand2Props> = ({ name, name2 }) => {
  const [boxBrand, setBoxBrand] = useState<PartialBoxBrandType | null>(null);

  //   useEffect(() => {
  //     console.log('boxBrand selectBoxBrand2', boxBrand);
  //   }, [boxBrand]);

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

export default SelectBoxBrand2;
