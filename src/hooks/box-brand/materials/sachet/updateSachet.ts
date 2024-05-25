import { useMutation } from 'react-query';
import axios from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { SachetType } from '@/types/box-brand/materials/sachet';

type updateSachetDTO = {
  data: Partial<SachetType>;
  sachetId: string;
};

const updateSachet = ({ data, sachetId }: updateSachetDTO) => {
  return axios.post(`/box-brand/sachet/${sachetId}`, data);
};

type UseUpdateSachetOptions = {
  config?: MutationConfig<typeof updateSachet>;
};

export const useUpdateSachet = ({ config }: UseUpdateSachetOptions = {}) => {
  const mutation = useMutation({
    ...config,
    mutationFn: updateSachet,
  });

  return { ...mutation, updateSachet: mutation.mutateAsync };
};
