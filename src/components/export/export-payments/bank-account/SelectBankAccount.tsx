import { Box, FormLabel, Input, SimpleGrid } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import InputFieldBankAccountSelect from './InputFieldBankAccountSelect';
import { BankAccountType } from '../../../../types/bankAccount';

interface SelectBankAccountProps {
  name: string;
  bankAccountSelect?: Partial<BankAccountType>;
  setBankAccountSelect?: (bankAccount: Partial<BankAccountType> | null) => void;
}

const SelectBankAccount: React.FC<SelectBankAccountProps> = ({
  name,
  bankAccountSelect,
  setBankAccountSelect,
}) => {
  const [bankAccount, setBankAccount] =
    useState<Partial<BankAccountType> | null>(null);

  useEffect(() => {
    if (!!bankAccountSelect) {
      setBankAccount(bankAccountSelect);
    }
  }, [bankAccountSelect]);

  useEffect(() => {
    if (!!setBankAccountSelect) {
      setBankAccountSelect(bankAccount);
    }
  }, [bankAccount, setBankAccountSelect]);

  return (
    <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
      <InputFieldBankAccountSelect
        name={name}
        label={'Productor/Razón Social'}
        placeholder={'Seleccione el productor'}
        setBankAccount={setBankAccount}
      />

      <Box>
        <FormLabel>Tipo</FormLabel>
        <Input isReadOnly={true} value={bankAccount?.type || ''} />
      </Box>
      <Box>
        <FormLabel>Propietario</FormLabel>
        <Input isReadOnly={true} value={bankAccount?.owner || ''} />
      </Box>
      <Box>
        <FormLabel>Identificación</FormLabel>
        <Input isReadOnly={true} value={bankAccount?.ownerID || ''} />
      </Box>
    </SimpleGrid>
  );
};

export default SelectBankAccount;
