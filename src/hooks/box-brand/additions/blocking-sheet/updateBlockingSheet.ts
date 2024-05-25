import { useMutation } from 'react-query';
import axios from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { BlockingSheetType } from '@/types/box-brand/additions/blockingSheet';

type updateBlockingSheetDTO = {
  data: Partial<BlockingSheetType>;
  blockingSheetId: string;
};

const updateBlockingSheet = ({
  data,
  blockingSheetId,
}: updateBlockingSheetDTO) => {
  return axios.post(`/box-brand/blocking-sheet/${blockingSheetId}`, data);
};

type UseUpdateBlockingSheetOptions = {
  config?: MutationConfig<typeof updateBlockingSheet>;
};

export const useUpdateBlockingSheet = ({
  config,
}: UseUpdateBlockingSheetOptions = {}) => {
  const mutation = useMutation({
    ...config,
    mutationFn: updateBlockingSheet,
  });

  return { ...mutation, updateBlockingSheet: mutation.mutateAsync };
};
