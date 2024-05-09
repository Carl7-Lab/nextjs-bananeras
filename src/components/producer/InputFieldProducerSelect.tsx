import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react';
import ProducerSelectBase, { PartialProducerType } from './ProducerSelectBase';

interface InputFieldProducerSelectProps {
  name: string;
  label: string;
  placeholder: string;
  setProducer?: (producer: PartialProducerType) => void;
}

const InputFieldProducerSelect: React.FC<InputFieldProducerSelectProps> = ({
  name,
  label,
  placeholder,
  setProducer,
}) => {
  const [field, meta, helpers] = useField(name);

  return (
    <FormControl id={name} isInvalid={!!meta.error && meta.touched}>
      <FormLabel fontSize='sm' mb='8px'>
        {label}
      </FormLabel>

      <ProducerSelectBase
        name={name}
        placeholder={placeholder}
        onChange={(newValue) => helpers.setValue(newValue?.id)}
        field={field}
        setProducer={setProducer}
      />

      {meta.error && meta.touched && (
        <FormErrorMessage mt='8px' mb='16px'>
          {meta.error}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default InputFieldProducerSelect;
