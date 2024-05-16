import { useMutation } from 'react-query';
import axios from '../../lib/axios';
import { MutationConfig } from '../../lib/react-query';
import { BusinessType } from '../../types/business';

interface CreateBusinessResponse {
  businessId: string;
}

export const createBusiness = (
  data: Partial<BusinessType>
): Promise<CreateBusinessResponse> => {
  return axios.post('/merchant/business', data);
};

type UseCreateBusinessOptions = {
  config?: MutationConfig<typeof createBusiness>;
};

export const useCreateBusiness = ({
  config,
}: UseCreateBusinessOptions = {}) => {
  const mutation = useMutation({
    ...config,
    mutationFn: createBusiness,
  });

  return { ...mutation, createBusiness: mutation.mutate };
};
