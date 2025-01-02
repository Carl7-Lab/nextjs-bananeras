import { Box, FormLabel, Input, SimpleGrid } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import InputFieldCuttingTypeSelect from './InputFieldCuttingTypeSelect';
import { CuttingType } from '../../../types/cuttingType';

interface SelectCuttingTypeProps {
  name: string;
  cuttingTypeSelect?: Partial<CuttingType>;
  setCuttingTypeSelect?: (cuttingType: Partial<CuttingType> | null) => void;
}

const SelectCuttingType: React.FC<SelectCuttingTypeProps> = ({
  name,
  cuttingTypeSelect,
  setCuttingTypeSelect,
}) => {
  const [cuttingType, setCuttingType] = useState<Partial<CuttingType> | null>(
    null
  );

  useEffect(() => {
    if (!!cuttingTypeSelect) {
      setCuttingType(cuttingTypeSelect);
    }
  }, [cuttingTypeSelect]);

  useEffect(() => {
    if (!!setCuttingTypeSelect) {
      setCuttingTypeSelect(cuttingType);
    }
  }, [cuttingType, setCuttingTypeSelect]);

  return (
    <>
      <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
        <InputFieldCuttingTypeSelect
          name={name}
          label={'Tipo de Corte'}
          placeholder={'Seleccione el Tipo de Corte'}
          setCuttingType={setCuttingType}
        />
        <Box>
          <FormLabel>Calidad</FormLabel>
          <Input isReadOnly={true} value={cuttingType?.quality || ''} />
        </Box>
        <Box>
          <FormLabel>Detalle del Cluster</FormLabel>
          <Input isReadOnly={true} value={cuttingType?.clusterDetail || ''} />
        </Box>
        <Box>
          <FormLabel>Patrón de Empaque</FormLabel>
          <Input
            isReadOnly={true}
            value={cuttingType?.packagingPattern || ''}
          />
        </Box>
      </SimpleGrid>
    </>
  );
};

export default SelectCuttingType;
