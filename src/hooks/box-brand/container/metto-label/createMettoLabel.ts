import { useMutation } from 'react-query';
import axios from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { MettoLabelType } from '@/types/box-brand/container/mettoLabel';

interface CreateMettoLabelResponse {
  mettoLabelId: string;
}

export const createMettoLabel = (
  data: Partial<MettoLabelType>
): Promise<CreateMettoLabelResponse> => {
  return axios.post('/box-brand/metto-label', data);
};

type UseCreateMettoLabelOptions = {
  config?: MutationConfig<typeof createMettoLabel>;
};

export const useCreateMettoLabel = ({
  config,
}: UseCreateMettoLabelOptions = {}) => {
  const mutation = useMutation({
    ...config,
    mutationFn: createMettoLabel,
  });

  return { ...mutation, createMettoLabel: mutation.mutate };
};
