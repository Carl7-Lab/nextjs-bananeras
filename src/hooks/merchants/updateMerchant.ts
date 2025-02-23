/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { AxiosResponse } from 'axios';
import { useMutation } from 'react-query';
import axios from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { MerchantType } from '../../types/merchant/merchant';

type updateMerchantDTO = {
  data: Partial<MerchantType>;
  merchantId: string;
};

const updateMerchant = ({
  data,
  merchantId,
}: updateMerchantDTO): Promise<AxiosResponse> => {
  return axios.post(`/merchant/${merchantId}`, data);
};

type UseUpdateMerchantOptions = {
  config?: MutationConfig<typeof updateMerchant>;
};

export const useUpdateMerchant = ({
  config,
}: UseUpdateMerchantOptions = {}) => {
  const mutation = useMutation({
    ...config,
    mutationFn: updateMerchant,
  });

  return { ...mutation, updateMerchant: mutation.mutateAsync };
};
