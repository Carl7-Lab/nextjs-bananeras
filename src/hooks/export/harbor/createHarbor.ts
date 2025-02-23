/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useMutation } from 'react-query';
import axios from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { HarborType } from '@/types/harbor';

interface CreateHarborResponse {
  exportId: string;
}

export const createHarbor = (
  data: Partial<HarborType>
): Promise<CreateHarborResponse> => {
  return axios.post('/harbor', data);
};

type UseCreateHarborOptions = {
  config?: MutationConfig<typeof createHarbor>;
};

export const useCreateHarbor = ({ config }: UseCreateHarborOptions = {}) => {
  const mutation = useMutation({
    ...config,
    mutationFn: createHarbor,
  });

  return { ...mutation, createHarbor: mutation.mutate };
};
