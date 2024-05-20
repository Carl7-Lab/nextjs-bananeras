import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react';
import AddStrappingModal from './AddStrappingModal';
import StrappingSelectBase from './StrappingSelectBase';

interface InputFieldStrappingSelectProps {
  name: string;
  label: string;
  placeholder: string;
}

const InputFieldStrappingSelect: React.FC<InputFieldStrappingSelectProps> = ({
  name,
  label,
  placeholder,
}) => {
  const [field, meta, helpers] = useField(name);

  return (
    <FormControl id={name} isInvalid={!!meta.error && meta.touched}>
      <FormLabel fontSize='sm' mb='8px' h={'21px'}>
        {label} <AddStrappingModal />
      </FormLabel>

      <StrappingSelectBase
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

export default InputFieldStrappingSelect;
