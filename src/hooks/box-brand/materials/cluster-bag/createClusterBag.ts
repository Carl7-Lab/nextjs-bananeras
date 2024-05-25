import { useMutation } from 'react-query';
import axios from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { ClusterBagType } from '@/types/box-brand/materials/clusterBag';

interface CreateClusterBagResponse {
  clusterBagId: string;
}

export const createClusterBag = (
  data: Partial<ClusterBagType>
): Promise<CreateClusterBagResponse> => {
  return axios.post('/box-brand/cluster-bag', data);
};

type UseCreateClusterBagOptions = {
  config?: MutationConfig<typeof createClusterBag>;
};

export const useCreateClusterBag = ({
  config,
}: UseCreateClusterBagOptions = {}) => {
  const mutation = useMutation({
    ...config,
    mutationFn: createClusterBag,
  });

  return { ...mutation, createClusterBag: mutation.mutate };
};
