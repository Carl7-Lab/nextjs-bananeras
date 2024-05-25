import { useMutation } from 'react-query';
import axios from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { StrippingType } from '@/types/box-brand/container/stripping';

type updateStrippingDTO = {
  data: Partial<StrippingType>;
  strippingId: string;
};

const updateStripping = ({ data, strippingId }: updateStrippingDTO) => {
  return axios.post(`/box-brand/stripping/${strippingId}`, data);
};

type UseUpdateStrippingOptions = {
  config?: MutationConfig<typeof updateStripping>;
};

export const useUpdateStripping = ({
  config,
}: UseUpdateStrippingOptions = {}) => {
  const mutation = useMutation({
    ...config,
    mutationFn: updateStripping,
  });

  return { ...mutation, updateStripping: mutation.mutateAsync };
};
