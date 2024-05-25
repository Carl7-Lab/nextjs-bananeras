import { useMutation } from 'react-query';
import axios from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { ClusterBagType } from '@/types/box-brand/materials/clusterBag';

type updateClusterBagDTO = {
  data: Partial<ClusterBagType>;
  clusterBagId: string;
};

const updateClusterBag = ({ data, clusterBagId }: updateClusterBagDTO) => {
  return axios.post(`/box-brand/cluster-bag/${clusterBagId}`, data);
};

type UseUpdateClusterBagOptions = {
  config?: MutationConfig<typeof updateClusterBag>;
};

export const useUpdateClusterBag = ({
  config,
}: UseUpdateClusterBagOptions = {}) => {
  const mutation = useMutation({
    ...config,
    mutationFn: updateClusterBag,
  });

  return { ...mutation, updateClusterBag: mutation.mutateAsync };
};
