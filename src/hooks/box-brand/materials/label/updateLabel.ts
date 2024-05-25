import { useMutation } from 'react-query';
import axios from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { LabelType } from '@/types/box-brand/materials/label';

type updateLabelDTO = {
  data: Partial<LabelType>;
  labelId: string;
};

const updateLabel = ({ data, labelId }: updateLabelDTO) => {
  return axios.post(`/box-brand/label/${labelId}`, data);
};

type UseUpdateLabelOptions = {
  config?: MutationConfig<typeof updateLabel>;
};

export const useUpdateLabel = ({ config }: UseUpdateLabelOptions = {}) => {
  const mutation = useMutation({
    ...config,
    mutationFn: updateLabel,
  });

  return { ...mutation, updateLabel: mutation.mutateAsync };
};
