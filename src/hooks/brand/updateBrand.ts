import { useMutation } from 'react-query';
import axios from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { BrandType } from '../../types/box-brand/specifications/brand';

type updateBrandDTO = {
  data: Partial<BrandType>;
  brandId: string;
};

const updateBrand = ({ data, brandId }: updateBrandDTO) => {
  return axios.post(`/box-brand/brand/${brandId}`, data);
};

type UseUpdateBrandOptions = {
  config?: MutationConfig<typeof updateBrand>;
};

export const useUpdateBrand = ({ config }: UseUpdateBrandOptions = {}) => {
  const mutation = useMutation({
    ...config,
    mutationFn: updateBrand,
  });

  return { ...mutation, updateBrand: mutation.mutateAsync };
};
