/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useMutation } from 'react-query';
import axios from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { ClientType } from '@/types/client';

interface CreateClientResponse {
  exportId: string;
}

export const createClient = (
  data: Partial<ClientType>
): Promise<CreateClientResponse> => {
  return axios.post('/client', data);
};

type UseCreateClientOptions = {
  config?: MutationConfig<typeof createClient>;
};

export const useCreateClient = ({ config }: UseCreateClientOptions = {}) => {
  const mutation = useMutation({
    ...config,
    mutationFn: createClient,
  });

  return { ...mutation, createClient: mutation.mutate };
};
