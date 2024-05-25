import { useMutation } from 'react-query';
import axios from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { BlockingSheetType } from '@/types/box-brand/additions/blockingSheet';

interface CreateBlockingSheetResponse {
  blockingSheetId: string;
}

export const createBlockingSheet = (
  data: Partial<BlockingSheetType>
): Promise<CreateBlockingSheetResponse> => {
  return axios.post('/box-brand/blocking-sheet', data);
};

type UseCreateBlockingSheetOptions = {
  config?: MutationConfig<typeof createBlockingSheet>;
};

export const useCreateBlockingSheet = ({
  config,
}: UseCreateBlockingSheetOptions = {}) => {
  const mutation = useMutation({
    ...config,
    mutationFn: createBlockingSheet,
  });

  return { ...mutation, createBlockingSheet: mutation.mutate };
};
