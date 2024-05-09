import { Box, FormLabel, Input, SimpleGrid } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { PartialHarborType } from '../harbor/HarborSelectBase';
import InputFieldHarborSelect from '../harbor/InputFieldHarborSelect';

interface InputFieldSelectorProps {
  name: string;
}

const SelectHarbor: React.FC<InputFieldSelectorProps> = ({ name }) => {
  const [harbor, setHarbor] = useState<PartialHarborType | null>(null);

  // useEffect(() => {
  //   console.log('harbor SelectHarbor', harbor);
  // }, [harbor]);

  return (
    <>
      <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
        <InputFieldHarborSelect
          name={name}
          label={'Puerto'}
          placeholder={'Seleccione el Puerto'}
          setHarbor={setHarbor}
        />

        <Box>
          <FormLabel>Tiempo de transporte</FormLabel>
          <Input isReadOnly={true} value={harbor?.transportTime || ''} />
        </Box>
        <Box>
          <FormLabel>País</FormLabel>
          <Input isReadOnly={true} value={harbor?.country || ''} />
        </Box>
        <Box>
          <FormLabel>Latitud</FormLabel>
          <Input
            isReadOnly={true}
            value={harbor?.latitude !== undefined ? `${harbor?.latitude}` : ''}
            // value={harbor?.latitude || ''}
          />
        </Box>
        <Box>
          <FormLabel>Ciudad</FormLabel>
          <Input isReadOnly={true} value={harbor?.city || ''} />
        </Box>
        <Box>
          <FormLabel>Longitud</FormLabel>
          <Input
            isReadOnly={true}
            value={
              harbor?.longitude !== undefined ? `${harbor?.longitude}` : ''
            }
          />
        </Box>
      </SimpleGrid>
    </>
  );
};

export default SelectHarbor;
