import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react';
import BankAccountSelectBase from './BankAccountSelectBase';
import { BankAccountType } from '../../../../types/bankAccount';

interface InputFieldBankAccountSelectProps {
  name: string;
  label: string;
  placeholder: string;
  setBankAccount?: (bankAccount: Partial<BankAccountType>) => void;
}

const InputFieldBankAccountSelect: React.FC<
  InputFieldBankAccountSelectProps
> = ({ name, label, placeholder, setBankAccount }) => {
  const [field, meta, helpers] = useField(name);

  return (
    <FormControl id={name} isInvalid={!!meta.error && meta.touched}>
      <FormLabel fontSize='sm' mb='8px'>
        {label}
      </FormLabel>

      <BankAccountSelectBase
        name={name}
        placeholder={placeholder}
        onChange={(newValue) => helpers.setValue(newValue?.id)}
        field={field}
        setBankAccount={setBankAccount}
      />

      {meta.error && meta.touched && (
        <FormErrorMessage mt='8px' mb='16px'>
          {meta.error}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default InputFieldBankAccountSelect;
