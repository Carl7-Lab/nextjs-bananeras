import { useMutation } from 'react-query';
import axios from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { HarborType } from '@/types/harbor';

type updateHarborDTO = {
  data: Partial<HarborType>;
  harborId: string;
};

const updateHarbor = ({ data, harborId }: updateHarborDTO) => {
  return axios.post(`/harbor/${harborId}`, data);
};

type UseUpdateHarborOptions = {
  config?: MutationConfig<typeof updateHarbor>;
};

export const useUpdateHarbor = ({ config }: UseUpdateHarborOptions = {}) => {
  const mutation = useMutation({
    ...config,
    mutationFn: updateHarbor,
  });

  return { ...mutation, updateHarbor: mutation.mutateAsync };
};
