import { Box, FormLabel, Input, SimpleGrid } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import InputFieldBoxBrandSelect from './InputFieldBoxBrandSelect';
import { BoxBrandType } from '../../types/box-brand/boxBrand';
import InputFieldNumber from '../ui/form/InputFieldNumber';

interface SelectBoxBrandProps {
  name: string;
  name2: string;
  namePrice?: string;
  boxQuantity?: number;
  price?: number;
  nameSubtotal1?: string;
  boxBrandSelect?: Partial<BoxBrandType>;
  contractType?: string;
  setBoxBrandSelect?: (boxBran: Partial<BoxBrandType> | null) => void;
}

const SelectBoxBrand: React.FC<SelectBoxBrandProps> = ({
  name,
  name2,
  namePrice,
  boxQuantity,
  price,
  nameSubtotal1,
  boxBrandSelect,
  contractType,
  setBoxBrandSelect,
}) => {
  const [boxBrand, setBoxBrand] = useState<Partial<BoxBrandType> | null>(null);

  useEffect(() => {
    if (!!boxBrandSelect) {
      setBoxBrand(boxBrandSelect);
    }
  }, [boxBrandSelect]);

  useEffect(() => {
    if (!!setBoxBrandSelect) {
      setBoxBrandSelect(boxBrand);
    }
  }, [boxBrand, setBoxBrandSelect]);

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

        <InputFieldNumber name={name2} label={'Numero de Cajas'} />

        {!!namePrice && !!nameSubtotal1 && (
          <>
            <InputFieldNumber
              name={namePrice}
              label={'Precio'}
              value={contractType === 'Contrato' ? 6.85 : 10.5}
              isDecimal
              isDolar
            />
            <Box></Box>
            <InputFieldNumber
              name={nameSubtotal1}
              label={'Subtotal1'}
              value={Number(boxQuantity) * Number(price)}
              isDecimal
              isDolar
            />
          </>
        )}
      </SimpleGrid>
    </>
  );
};

export default SelectBoxBrand;
