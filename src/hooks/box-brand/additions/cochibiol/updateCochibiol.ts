import { useMutation } from 'react-query';
import axios from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { CochibiolType } from '@/types/box-brand/additions/cochibiol';

type updateCochibiolDTO = {
  data: Partial<CochibiolType>;
  cochibiolId: string;
};

const updateCochibiol = ({ data, cochibiolId }: updateCochibiolDTO) => {
  return axios.post(`/box-brand/cochibiol/${cochibiolId}`, data);
};

type UseUpdateCochibiolOptions = {
  config?: MutationConfig<typeof updateCochibiol>;
};

export const useUpdateCochibiol = ({
  config,
}: UseUpdateCochibiolOptions = {}) => {
  const mutation = useMutation({
    ...config,
    mutationFn: updateCochibiol,
  });

  return { ...mutation, updateCochibiol: mutation.mutateAsync };
};
