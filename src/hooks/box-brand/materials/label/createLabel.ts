import { useMutation } from 'react-query';
import axios from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { LabelType } from '@/types/box-brand/materials/label';

interface CreateLabelResponse {
  labelId: string;
}

export const createLabel = (
  data: Partial<LabelType>
): Promise<CreateLabelResponse> => {
  return axios.post('/box-brand/label', data);
};

type UseCreateLabelOptions = {
  config?: MutationConfig<typeof createLabel>;
};

export const useCreateLabel = ({ config }: UseCreateLabelOptions = {}) => {
  const mutation = useMutation({
    ...config,
    mutationFn: createLabel,
  });

  return { ...mutation, createLabel: mutation.mutate };
};
