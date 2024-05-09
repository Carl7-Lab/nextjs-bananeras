import { Box, FormLabel, Input, SimpleGrid } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import InputFieldProducerSelect from '../producer/InputFieldProducerSelect';
import { PartialProducerType } from '../producer/ProducerSelectBase';

interface InputFieldSelectorProps {
  name: string;
  isSubmitting?: boolean;
}

const SelectProducer: React.FC<InputFieldSelectorProps> = ({
  name,
  isSubmitting,
}) => {
  const [producer, setProducer] = useState<PartialProducerType | null>(null);

  // useEffect(() => {
  //   console.log('producer selectProducer: ', producer);
  // }, [producer]);

  useEffect(() => {
    console.log('SelectProducer isSubmitting: ', isSubmitting);
  }, [isSubmitting]);

  return (
    <>
      <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
        <InputFieldProducerSelect
          name={name}
          label={'Productor'}
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
