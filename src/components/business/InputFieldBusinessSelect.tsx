import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { useField } from 'formik';
import React, { useEffect } from 'react';
import BusinessSelectBase from './BusinessSelectBase';
import { BusinessType } from '../../types/merchant/business';

interface InputFieldBusinessSelectProps {
  name: string;
  label: string;
  placeholder: string;
  merchant?: number;
  setBusiness?: (producer: Partial<BusinessType>) => void;
}

const InputFieldBusinessSelect: React.FC<InputFieldBusinessSelectProps> = ({
  name,
  label,
  placeholder,
  merchant,
  setBusiness,
}) => {
  const [field, meta, helpers] = useField(name);

  useEffect(() => {
    // console.log('InputFieldBusinessSelect merchant: ', merchant);
    helpers.setValue(null);
  }, [helpers, merchant]);

  return (
    <FormControl id={name} isInvalid={!!meta.error && meta.touched}>
      <FormLabel fontSize='sm' mb='8px'>
        {label}
      </FormLabel>

      <BusinessSelectBase
        name={name}
        placeholder={placeholder}
        onChange={(newValue) => helpers.setValue(newValue?.id)}
        field={field}
        setBusiness={setBusiness}
        merchant={merchant}
      />

      {meta.error && meta.touched && (
        <FormErrorMessage mt='8px' mb='16px'>
          {meta.error}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default InputFieldBusinessSelect;
