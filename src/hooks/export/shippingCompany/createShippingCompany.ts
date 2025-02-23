/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useMutation } from 'react-query';
import axios from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { ShippingCompanyType } from '@/types/shippingCompany';

interface CreateShippingCompanyResponse {
  shippingCompanyId: string;
}

export const createShippingCompany = (
  data: Partial<ShippingCompanyType>
): Promise<CreateShippingCompanyResponse> => {
  return axios.post('harbor/shipping-company', data);
};

type UseCreateShippingCompanyOptions = {
  config?: MutationConfig<typeof createShippingCompany>;
};

export const useCreateShippingCompany = ({
  config,
}: UseCreateShippingCompanyOptions = {}) => {
  const mutation = useMutation({
    ...config,
    mutationFn: createShippingCompany,
  });

  return { ...mutation, createShippingCompany: mutation.mutate };
};
