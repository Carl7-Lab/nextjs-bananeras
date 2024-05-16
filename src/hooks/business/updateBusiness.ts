import { useMutation } from 'react-query';
import axios from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { BusinessType } from '@/types/business';

type updateBusinessDTO = {
  data: Partial<BusinessType>;
  businessId: string;
};

const updateBusiness = ({ data, businessId }: updateBusinessDTO) => {
  return axios.post(`/merchant/business/${businessId}`, data);
};

type UseUpdateBusinessOptions = {
  config?: MutationConfig<typeof updateBusiness>;
};

export const useUpdateBusiness = ({
  config,
}: UseUpdateBusinessOptions = {}) => {
  const mutation = useMutation({
    ...config,
    mutationFn: updateBusiness,
  });

  return { ...mutation, updateBusiness: mutation.mutateAsync };
};
