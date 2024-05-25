import { useMutation } from 'react-query';
import axios from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { BrandType } from '@/types/box-brand/specifications/brand';

interface CreateBrandResponse {
  brandId: string;
}

export const createBrand = (
  data: Partial<BrandType>
): Promise<CreateBrandResponse> => {
  return axios.post('/box-brand/brand', data);
};

type UseCreateBrandOptions = {
  config?: MutationConfig<typeof createBrand>;
};

export const useCreateBrand = ({ config }: UseCreateBrandOptions = {}) => {
  const mutation = useMutation({
    ...config,
    mutationFn: createBrand,
  });

  return { ...mutation, createBrand: mutation.mutate };
};
