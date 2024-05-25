import { useMutation } from 'react-query';
import axios from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { PesticideType } from '../../../../types/box-brand/post-harvest/pesticide';

type updatePesticideDTO = {
  data: Partial<PesticideType>;
  pesticideId: string;
};

const updatePesticide = ({ data, pesticideId }: updatePesticideDTO) => {
  return axios.post(`/box-brand/pesticide/${pesticideId}`, data);
};

type UseUpdatePesticideOptions = {
  config?: MutationConfig<typeof updatePesticide>;
};

export const useUpdatePesticide = ({
  config,
}: UseUpdatePesticideOptions = {}) => {
  const mutation = useMutation({
    ...config,
    mutationFn: updatePesticide,
  });

  return { ...mutation, updatePesticide: mutation.mutateAsync };
};
