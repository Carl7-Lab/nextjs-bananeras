import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react';
import AddThermographModal from './AddThermographModal';
import ThermographSelectBase from './ThermographSelectBase';

interface InputFieldThermographSelectProps {
  name: string;
  label: string;
  placeholder: string;
}

const InputFieldThermographSelect: React.FC<
  InputFieldThermographSelectProps
> = ({ name, label, placeholder }) => {
  const [field, meta, helpers] = useField(name);

  return (
    <FormControl id={name} isInvalid={!!meta.error && meta.touched}>
      <FormLabel fontSize='sm' mb='8px' h={'21px'}>
        {label} <AddThermographModal />
      </FormLabel>

      <ThermographSelectBase
        name={name}
        placeholder={placeholder}
        onChange={(newValue) => helpers.setValue(newValue?.id)}
        field={field}
      />

      {meta.error && meta.touched && (
        <FormErrorMessage mt='8px' mb='16px'>
          {meta.error}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default InputFieldThermographSelect;
