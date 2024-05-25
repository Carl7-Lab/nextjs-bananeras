import { useMutation } from 'react-query';
import axios from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { CochibiolType } from '@/types/box-brand/additions/cochibiol';

interface CreateCochibiolResponse {
  cochibiolId: string;
}

export const createCochibiol = (
  data: Partial<CochibiolType>
): Promise<CreateCochibiolResponse> => {
  return axios.post('/box-brand/cochibiol', data);
};

type UseCreateCochibiolOptions = {
  config?: MutationConfig<typeof createCochibiol>;
};

export const useCreateCochibiol = ({
  config,
}: UseCreateCochibiolOptions = {}) => {
  const mutation = useMutation({
    ...config,
    mutationFn: createCochibiol,
  });

  return { ...mutation, createCochibiol: mutation.mutate };
};
