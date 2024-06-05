import { Box, FormLabel, Input, SimpleGrid } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import InputFieldProducerSelect from './InputFieldProducerSelect';
import { PartialProducerType } from './ProducerSelectBase';

interface SelectProducerProps {
  name: string;
  setProducerSelect?: (producer: PartialProducerType | null) => void;
}

const SelectProducer: React.FC<SelectProducerProps> = ({
  name,
  setProducerSelect,
}) => {
  const [producer, setProducer] = useState<PartialProducerType | null>(null);

  useEffect(() => {
    if (!!setProducerSelect) {
      setProducerSelect(producer);
    }
  }, [producer, setProducerSelect]);

  return (
    <>
      <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
        <InputFieldProducerSelect
          name={name}
          label={'Productor/Razón Social'}
          placeholder={'Seleccione el productor'}
          setProducer={setProducer}
        />

        <Box>
          <FormLabel>RUC</FormLabel>
          <Input isReadOnly={true} value={producer?.businessId || ''} />
        </Box>
        <Box>
          <FormLabel>Ciudad</FormLabel>
          <Input isReadOnly={true} value={producer?.city || ''} />
        </Box>
        <Box>
          <FormLabel>Dirección</FormLabel>
          <Input isReadOnly={true} value={producer?.address || ''} />
        </Box>
      </SimpleGrid>
    </>
  );
};

export default SelectProducer;
