import { useMutation } from 'react-query';
import axios from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { MerchantType } from '@/types/merchant/merchant';

interface CreateMerchantResponse {
  merchantId: string;
}

export const createMerchant = (
  data: Partial<MerchantType>
): Promise<CreateMerchantResponse> => {
  return axios.post('/merchant', data);
};

type UseCreateMerchantOptions = {
  config?: MutationConfig<typeof createMerchant>;
};

export const useCreateMerchant = ({
  config,
}: UseCreateMerchantOptions = {}) => {
  const mutation = useMutation({
    ...config,
    mutationFn: createMerchant,
  });

  return { ...mutation, createMerchant: mutation.mutate };
};
