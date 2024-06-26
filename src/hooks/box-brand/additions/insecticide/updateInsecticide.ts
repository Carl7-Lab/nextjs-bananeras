import { useMutation } from 'react-query';
import axios from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { InsecticideType } from '@/types/box-brand/additions/insecticide';

type updateInsecticideDTO = {
  data: Partial<InsecticideType>;
  insecticideId: string;
};

const updateInsecticide = ({ data, insecticideId }: updateInsecticideDTO) => {
  return axios.post(`/box-brand/insecticide/${insecticideId}`, data);
};

type UseUpdateInsecticideOptions = {
  config?: MutationConfig<typeof updateInsecticide>;
};

export const useUpdateInsecticide = ({
  config,
}: UseUpdateInsecticideOptions = {}) => {
  const mutation = useMutation({
    ...config,
    mutationFn: updateInsecticide,
  });

  return { ...mutation, updateInsecticide: mutation.mutateAsync };
};
