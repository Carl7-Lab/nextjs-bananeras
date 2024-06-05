import { Box, FormLabel, Input, SimpleGrid } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import InputFieldBusinessSelect from './InputFieldBusinessSelect';
import { BusinessType } from '../../types/business';

interface SelectBusinessProps {
  name: string;
  merchant?: number;
}

const SelectBusiness: React.FC<SelectBusinessProps> = ({ name, merchant }) => {
  const [business, setBusiness] = useState<Partial<BusinessType> | null>(null);

  return (
    <>
      <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
        <InputFieldBusinessSelect
          name={name}
          label={'Finca/Razón Social'}
          placeholder={'Seleccione la finca'}
          setBusiness={setBusiness}
          merchant={merchant}
        />

        <Box>
          <FormLabel>Área</FormLabel>
          <Input isReadOnly={true} value={business?.area || ''} />
        </Box>
        <Box>
          <FormLabel>Ciudad</FormLabel>
          <Input isReadOnly={true} value={business?.city || ''} />
        </Box>
        <Box>
          <FormLabel>Dirección</FormLabel>
          <Input isReadOnly={true} value={business?.address || ''} />
        </Box>
      </SimpleGrid>
    </>
  );
};

export default SelectBusiness;
