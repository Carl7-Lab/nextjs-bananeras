import { useMutation } from 'react-query';
import axios from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';

export const deleteBrand = (brandId: string): Promise<unknown> => {
  return axios.post(`/box-brand/brand/${brandId}/cancel`);
};

type UseDeleteBrandOptions = {
  config?: MutationConfig<typeof deleteBrand>;
};

export const useDeleteBrand = ({ config }: UseDeleteBrandOptions = {}) => {
  const mutation = useMutation({
    ...config,
    mutationFn: deleteBrand,
  });

  return { ...mutation, deleteBrand: mutation.mutate };
};

// const { data: customer, isLoading: isLoadingCustomer } = useCustomer({ customerId: customerId });
// const { updateCustomer, isLoading } = useUpdateCustomer();
// const { isLoading: isDeactivateLoading, deactivatePaymentRequest } = useDeactivatePaymentRequest();
