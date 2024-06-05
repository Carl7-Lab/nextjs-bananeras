import { useMutation } from 'react-query';
import axios from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { BankAccountType } from '@/types/bankAccount';

type updateBankAccountDTO = {
  data: Partial<BankAccountType>;
  bankAccountId: string;
};

const updateBankAccount = ({ data, bankAccountId }: updateBankAccountDTO) => {
  return axios.post(`/bank-account/${bankAccountId}`, data);
};

type UseUpdateBankAccountOptions = {
  config?: MutationConfig<typeof updateBankAccount>;
};

export const useUpdateBankAccount = ({
  config,
}: UseUpdateBankAccountOptions = {}) => {
  const mutation = useMutation({
    ...config,
    mutationFn: updateBankAccount,
  });

  return { ...mutation, updateBankAccount: mutation.mutateAsync };
};
