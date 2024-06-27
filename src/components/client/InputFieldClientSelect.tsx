import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react';
import ClientSelectBase from './ClientSelectBase';
import { ClientType } from '../../types/client';

interface InputFieldClientSelectProps {
  name: string;
  label: string;
  placeholder: string;
  harbor?: number;
  setClient?: (client: Partial<ClientType>) => void;
}

const InputFieldClientSelect: React.FC<InputFieldClientSelectProps> = ({
  name,
  label,
  placeholder,
  harbor,
  setClient,
}) => {
  const [field, meta, helpers] = useField(name);

  return (
    <FormControl id={name} isInvalid={!!meta.error && meta.touched}>
      <FormLabel fontSize='sm' mb='8px'>
        {label}
      </FormLabel>

      <ClientSelectBase
        name={name}
        placeholder={placeholder}
        onChange={(newValue) => helpers.setValue(newValue?.id)}
        field={field}
        setClient={setClient}
        harbor={harbor}
      />

      {meta.error && meta.touched && (
        <FormErrorMessage mt='8px' mb='16px'>
          {meta.error}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default InputFieldClientSelect;
