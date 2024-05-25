import { useMutation } from 'react-query';
import axios from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { ThermographType } from '@/types/box-brand/container/thermograph';

interface CreateThermographResponse {
  thermographId: string;
}

export const createThermograph = (
  data: Partial<ThermographType>
): Promise<CreateThermographResponse> => {
  return axios.post('/box-brand/thermograph', data);
};

type UseCreateThermographOptions = {
  config?: MutationConfig<typeof createThermograph>;
};

export const useCreateThermograph = ({
  config,
}: UseCreateThermographOptions = {}) => {
  const mutation = useMutation({
    ...config,
    mutationFn: createThermograph,
  });

  return { ...mutation, createThermograph: mutation.mutate };
};
