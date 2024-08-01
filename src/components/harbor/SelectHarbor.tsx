import { Box, FormLabel, Input, SimpleGrid } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import InputFieldHarborSelect from './InputFieldHarborSelect';
import { HarborType } from '../../types/harbor';

interface SelectHarborProps {
  name: string;
  harborSelect?: Partial<HarborType>;
  type: 'Nacional' | 'Internacional';
  setHarborSelect?: (harbor: Partial<HarborType> | null) => void;
}

const SelectHarbor: React.FC<SelectHarborProps> = ({
  name,
  harborSelect,
  type,
  setHarborSelect,
}) => {
  const [harbor, setHarbor] = useState<Partial<HarborType> | null>(null);

  useEffect(() => {
    if (!!harborSelect) {
      setHarbor(harborSelect);
    }
  }, [harborSelect]);

  useEffect(() => {
    if (!!setHarborSelect) {
      setHarborSelect(harbor);
    }
  }, [harbor, setHarborSelect]);

  return (
    <>
      <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
        <InputFieldHarborSelect
          name={name}
          label={'Puerto'}
          placeholder={'Seleccione el Puerto'}
          setHarbor={setHarbor}
          type={type}
        />
        {/* <Box>
              <FormLabel>Tiempo de transporte</FormLabel>
              <Input isReadOnly={true} value={harbor?.transportTime || ''} />
            </Box> */}
        <Box>
          <FormLabel>País</FormLabel>
          <Input isReadOnly={true} value={harbor?.country || ''} />
        </Box>
        <Box>
          <FormLabel>Latitud</FormLabel>
          <Input
            isReadOnly={true}
            value={
              harbor?.latitude !== undefined && harbor?.latitude !== null
                ? `${harbor?.latitude}`
                : ''
            }
            placeholder={
              harbor?.latitude !== undefined && harbor?.latitude === null
                ? 'No se ha ingresado el valor'
                : ''
            }
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
              harbor?.longitude !== undefined && harbor?.longitude !== null
                ? `${harbor?.longitude}`
                : ''
            }
            placeholder={
              harbor?.longitude !== undefined && harbor?.longitude === null
                ? 'No se ha ingresado el valor'
                : ''
            }
          />
        </Box>
      </SimpleGrid>
    </>
  );
};

export default SelectHarbor;
