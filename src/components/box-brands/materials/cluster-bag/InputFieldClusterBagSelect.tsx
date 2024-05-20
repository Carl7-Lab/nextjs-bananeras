import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react';
import AddClusterBagModal from './AddClusterBagModal';
import ClusterBagSelectBase from './ClusterBagSelectBase';

interface InputFieldClusterBagSelectProps {
  name: string;
  label: string;
  placeholder: string;
}

const InputFieldClusterBagSelect: React.FC<InputFieldClusterBagSelectProps> = ({
  name,
  label,
  placeholder,
}) => {
  const [field, meta, helpers] = useField(name);

  return (
    <FormControl id={name} isInvalid={!!meta.error && meta.touched}>
      <FormLabel fontSize='sm' mb='8px' h={'21px'}>
        {label} <AddClusterBagModal />
      </FormLabel>

      <ClusterBagSelectBase
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

export default InputFieldClusterBagSelect;
