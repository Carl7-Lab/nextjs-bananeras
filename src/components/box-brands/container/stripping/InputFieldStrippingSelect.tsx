import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react';
import AddStrippingModal from './AddStrippingModal';
import StrippingSelectBase from './StrippingSelectBase';

interface InputFieldStrippingSelectProps {
  name: string;
  label: string;
  placeholder: string;
}

const InputFieldStrippingSelect: React.FC<InputFieldStrippingSelectProps> = ({
  name,
  label,
  placeholder,
}) => {
  const [field, meta, helpers] = useField(name);

  return (
    <FormControl id={name} isInvalid={!!meta.error && meta.touched}>
      <FormLabel fontSize='sm' mb='8px' h={'21px'}>
        {label} <AddStrippingModal />
      </FormLabel>

      <StrippingSelectBase
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

export default InputFieldStrippingSelect;
