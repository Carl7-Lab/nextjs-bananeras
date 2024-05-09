import { useMutation } from 'react-query';
import axios from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { ClientType } from '@/types/client';

type updateClientDTO = {
  data: Partial<ClientType>;
  clientId: string;
};

const updateClient = ({ data, clientId }: updateClientDTO) => {
  return axios.post(`/client/${clientId}`, data);
};

type UseUpdateClientOptions = {
  config?: MutationConfig<typeof updateClient>;
};

export const useUpdateClient = ({ config }: UseUpdateClientOptions = {}) => {
  const mutation = useMutation({
    ...config,
    mutationFn: updateClient,
  });

  return { ...mutation, updateClient: mutation.mutateAsync };
};
