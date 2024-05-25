import { useMutation } from 'react-query';
import axios from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { RubberType } from '@/types/box-brand/materials/rubber';

type updateRubberDTO = {
  data: Partial<RubberType>;
  rubberId: string;
};

const updateRubber = ({ data, rubberId }: updateRubberDTO) => {
  return axios.post(`/box-brand/rubber/${rubberId}`, data);
};

type UseUpdateRubberOptions = {
  config?: MutationConfig<typeof updateRubber>;
};

export const useUpdateRubber = ({ config }: UseUpdateRubberOptions = {}) => {
  const mutation = useMutation({
    ...config,
    mutationFn: updateRubber,
  });

  return { ...mutation, updateRubber: mutation.mutateAsync };
};
